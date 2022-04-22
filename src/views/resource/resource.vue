<!--
 * @Author: 郑钊宇
 * @Date: 2022-03-30 18:51:55
 * @LastEditTime: 2022-04-22 12:04:42
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.urlname" placeholder="资源名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.types" placeholder="资源类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in resourceTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.display_name" />
      </el-select>
      <el-select v-model="listQuery.genre" placeholder="资源类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in resourceGenreOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.display_name" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button> -->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="资源名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.urlname }}
        </template>
      </el-table-column>
      <el-table-column label="资源地址" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.urladdress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源类型" width="220" align="center">
        <template slot-scope="scope">
          <span v-for="type in scope.row.types" :key="type">{{ type }} </span>
        </template>
      </el-table-column>
      <el-table-column label="资源类别" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.genre }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="资源名称" prop="urlname">
          <el-input v-model="temp.urlname" />
        </el-form-item>
        <el-form-item label="资源地址" prop="urladdress">
          <el-input v-model="temp.urladdress" />
        </el-form-item>
        <el-form-item label="资源类别" prop="types">
          <el-checkbox-group v-model="temp.types">
            <el-checkbox v-for="item in resourceTypeOptions" :key="item.key" :label="item.display_name" name="types" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="资源类型" prop="genre">
          <el-select v-model="temp.genre" class="filter-item" placeholder="点击选择">
            <el-option v-for="item in resourceGenreOptions" :key="item.key" :label="item.display_name" :value="item.display_name" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDatabaseList, insertDatabaseList, deleteDatabaseList, updateDatabaseList, searchDatabase } from '@/api/resource'
import Pagination from '@/components/Pagination'

export default {
  name: 'ResourceTable',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        types: '',
        urlname: '',
        genre: ''
      },
      temp: {
        urlname: '',
        urladdress: '',
        types: [],
        genre: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        urlname: [{ required: true, message: '资源名称不能为空', trigger: 'blur' }],
        urladdress: [{ required: true, message: '资源地址不能为空', trigger: 'blur' }],
        types: [{ type: 'array', required: true, message: '请至少选择一个资源类型', trigger: 'change' }],
        genre: [{ required: true, message: '资源类别不能为空', trigger: 'change' }]
      },
      resourceTypeOptions: [
        { key: 'comprehensive', display_name: '综合' },
        { key: 'Periodicals', display_name: '期刊' },
        { key: 'Meeting', display_name: '会议' },
        { key: 'PhD thesis', display_name: '博硕' },
        { key: 'digital book', display_name: '电子图书' },
        { key: 'Statistics', display_name: '数据统计' },
        { key: 'Bibliometrics', display_name: '文献计量' },
        { key: 'digital library', display_name: '数字图书馆' }
      ],
      resourceGenreOptions: [
        { key: 'CN', display_name: '中文' },
        { key: 'Foreign', display_name: '外文' },
        { key: 'CN & foreign', display_name: '中外文' },
        { key: 'Try', display_name: '试用' },
        { key: 'Open', display_name: '开放' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchDatabaseList(this.listQuery).then(response => {
        // console.log(response)
        const list = response.data.pageinfo.list
        list.forEach(ele => {
          if (ele.types) ele.types = ele.types.split('|')
        })
        this.list = list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        urlname: '',
        urladdress: '',
        types: [],
        genre: '',
        remark: ''
      }
    },
    handleFilter() {
      this.listLoading = true
      // console.log(this.listQuery)
      searchDatabase(this.listQuery).then(response => {
        // console.log(response)
        const list = response.data.pageinfo.list
        list.forEach(ele => {
          ele.types = ele.types.split('|')
        })
        this.list = list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let postType = ''
          this.temp['types'].forEach(type => {
            postType = postType + type + '|'
          })
          const data = this.temp
          data['types'] = postType.slice(0, postType.length - 1)
          insertDatabaseList(data).then(() => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let postType = ''
          this.temp['types'].forEach(type => {
            postType = postType + type + '|'
          })
          const data = this.temp
          data['types'] = postType.slice(0, postType.length - 1)
          updateDatabaseList(data).then(() => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteDatabaseList(row.id).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

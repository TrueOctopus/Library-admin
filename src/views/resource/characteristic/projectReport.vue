<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-22 11:03:28
 * @LastEditTime: 2022-04-22 12:05:46
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.author" placeholder="作者" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.subjectName" placeholder="课题名称或承担项目" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.projectSource" placeholder="项目来源" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

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
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="课题名称或承担项目" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.subjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目来源" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectSource }}</span>
        </template>
      </el-table-column>
      <el-table-column label="起止时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startAndEndTime }}</span>
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
        <el-form-item label="作者" prop="author">
          <el-input v-model="temp.author" />
        </el-form-item>
        <el-form-item label="课题名称或承担项目" prop="subjectName">
          <el-input v-model="temp.subjectName" />
        </el-form-item>
        <el-form-item label="项目来源" prop="projectSource">
          <el-input v-model="temp.projectSource" />
        </el-form-item>
        <el-form-item label="起止时间" prop="startAndEndTime">
          <el-input v-model="temp.startAndEndTime" />
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
import { fetchProjectReportList, searchProjectReport, addProjectReport, deleteProjectReport, updateProjectReport } from '@/api/characteristic/projectReport'
import Pagination from '@/components/Pagination'

export default {
  name: 'ProjectReportTable',
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        author: '',
        subjectName: '',
        projectSource: ''
      },
      temp: {
        author: '',
        subjectName: '',
        projectSource: '',
        startAndEndTime: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        subjectName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        author: [{ required: true, message: '作者不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchProjectReportList(this.listQuery).then(response => {
        // console.log(response)
        const list = response.data.pageinfo.list
        this.list = list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        author: '',
        subjectName: '',
        projectSource: '',
        startAndEndTime: ''
      }
    },
    handleFilter() {
      this.listLoading = true
      // console.log(this.listQuery)
      searchProjectReport(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageinfo.list
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
          addProjectReport(this.temp).then(() => {
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
          updateProjectReport(this.temp).then(() => {
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
      deleteProjectReport(row.id).then(() => {
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

<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-22 19:38:59
 * @LastEditTime: 2022-04-23 10:46:20
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.author" placeholder="作者" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.paperTitle" placeholder="题名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.sourcePublication" placeholder="来源刊物" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.meetingType" placeholder="会议类型" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.meetingName" placeholder="会议名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

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
      <el-table-column label="题名" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.paperTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源刊物" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sourcePublication }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发表时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.issuingTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会议类型" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meetingType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会议名称" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meetingName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会议地点" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meetingPlace }}</span>
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
        <el-form-item label="题名" prop="paperTitle">
          <el-input v-model="temp.paperTitle" />
        </el-form-item>
        <el-form-item label="来源刊物" prop="sourcePublication">
          <el-input v-model="temp.sourcePublication" />
        </el-form-item>
        <el-form-item label="发表时间" prop="issuingTime">
          <el-input v-model="temp.issuingTime" />
        </el-form-item>
        <el-form-item label="会议类型" prop="meetingType">
          <el-input v-model="temp.meetingType" />
        </el-form-item>
        <el-form-item label="会议名称" prop="meetingName">
          <el-input v-model="temp.meetingName" />
        </el-form-item>
        <el-form-item label="会议地点" prop="meetingPlace">
          <el-input v-model="temp.meetingPlace" />
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
import { fetchMeetingList, searchMeeting, addMeeting, deleteMeeting, updateMeeting } from '@/api/characteristic/meeting'
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
        paperTitle: '',
        sourcePublication: '',
        meetingType: '',
        meetingName: ''
      },
      temp: {
        author: '',
        paperTitle: '',
        sourcePublication: '',
        issuingTime: '',
        meetingType: '',
        meetingName: '',
        meetingPlace: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        paperTitle: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
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
      fetchMeetingList(this.listQuery).then(response => {
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
        paperTitle: '',
        sourcePublication: '',
        issuingTime: '',
        meetingType: '',
        meetingName: '',
        meetingPlace: ''
      }
    },
    handleFilter() {
      this.listLoading = true
      // console.log(this.listQuery)
      searchMeeting(this.listQuery).then(response => {
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
          addMeeting(this.temp).then(() => {
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
          updateMeeting(this.temp).then(() => {
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
      deleteMeeting(row.id).then(() => {
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

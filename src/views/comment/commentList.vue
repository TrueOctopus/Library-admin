<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-09 14:25:09
 * @LastEditTime: 2022-04-09 15:30:00
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.commenter" placeholder="留言者" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.responder" placeholder="答复者" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.messagecontent" placeholder="留言信息" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.checkflag" placeholder="是否通过" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in checkflagOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
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
      <el-table-column label="留言者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.commenter }}
        </template>
      </el-table-column>
      <el-table-column label="留言信息" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.messagecontent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="留言时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.commenttime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.reply }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.responder }}</span>
        </template>
      </el-table-column>
      <el-table-column label="验证" width="110" align="center">
        <template slot-scope="scope">
          {{ checkflagOptions[scope.row.checkflag].display_name }}({{ checkflagOptions[scope.row.checkflag].key }})
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            通过并回复
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="留言者" prop="commenter">
          <el-input v-model="temp.commenter" disabled />
        </el-form-item>
        <el-form-item label="留言" prop="messagecontent">
          <el-input v-model="temp.messagecontent" disabled type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="回复" prop="reply">
          <el-input v-model="temp.reply" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="回复者" prop="responder">
          <el-input v-model="temp.responder" />
        </el-form-item>
        <el-form-item label="验证" prop="checkflag">
          <el-select v-model="temp.checkflag" class="filter-item" placeholder="点击选择">
            <el-option v-for="item in checkflagOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchCommentList, updateComment, searchComment, deleteComment } from '@/api/comment'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReaderTable',
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        checkflag: undefined,
        commenter: '',
        messagecontent: '',
        responder: ''
      },
      temp: {
        checkflag: 0,
        commenter: '',
        id: undefined,
        messagecontent: '',
        reply: '',
        responder: ''
      },
      dialogFormVisible: false,
      rules: {
        responder: [{ required: true, message: '回复者不能为空', trigger: 'blur' }]
      },
      checkflagOptions: [
        { key: '0', display_name: '未通过' },
        { key: '1', display_name: '已通过' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchCommentList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        checkflag: 0,
        commenter: '',
        id: undefined,
        messagecontent: '',
        reply: '',
        responder: ''
      }
    },
    handleFilter() {
      this.listLoading = true
      // console.log('this.listQuery', this.listQuery)
      searchComment(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.temp.checkflag = 1
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log('this.temp', this.temp)
          const data = this.temp
          delete data.commenttime
          updateComment(data).then(() => {
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
      deleteComment(row.id).then(() => {
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

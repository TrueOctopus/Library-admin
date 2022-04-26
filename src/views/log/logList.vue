<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-24 19:59:33
 * @LastEditTime: 2022-04-26 14:53:35
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="center"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-top: 0.5rem" @click="handleFilter">
        搜索
      </el-button>
    </div> -->

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" width="150" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="IP地址" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="登录系统" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.os }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录浏览器" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.browser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录权限" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.root }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="fetchData" />

  </div>
</template>

<script>
import { logSearch, timeSearchLog } from '@/api/log'
import Pagination from '@/components/Pagination'

export default {
  name: 'LogTable',
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        initialTime: '',
        endTime: ''
      },
      dateRange: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    dateTimeToString(date) {
      var y = date.getFullYear()
      var M = date.getMonth() + 1
      var d = date.getDate()
      var H = date.getHours()
      var m = date.getMinutes()
      var s = date.getSeconds()
      return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (H < 10 ? ('0' + H) : H) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
    },
    fetchData() {
      this.listLoading = true
      logSearch(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.logs.list
        this.total = response.data.logs.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listLoading = true
      this.listQuery.initialTime = this.dateTimeToString(this.dateRange[0])
      this.listQuery.endTime = this.dateTimeToString(this.dateRange[1])
      // console.log('this.listQuery', this.listQuery)
      timeSearchLog(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.logs.list
        this.total = response.data.logs.total
        this.listLoading = false
      })
    }
  }
}
</script>

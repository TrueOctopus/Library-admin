<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-02 20:16:02
 * @LastEditTime: 2022-04-04 15:40:53
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="书名">
        <template slot-scope="{row}">
          <router-link :to="'/publicity/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.releasetime }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.isrelease | statusFilter">
            {{ status[row.isrelease] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/publicity/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchPublicityList } from '@/api/publicity'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'PublicityList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        // published: 'success',
        // draft: 'info',
        // deleted: 'danger'
        '1': 'success',
        '0': 'info',
        '2': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      status: ['草稿', '发布', '删除'],
      listQuery: {
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchPublicityList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.catalog" placeholder="类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in catalogOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.display_name" />
      </el-select>
      <el-select v-model="listQuery.isrelease" placeholder="文章状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/announcement/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <!-- <el-table-column width="220px" align="center" label="摘要">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="120px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.catalog }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="120px" align="center" label="主题图片">
        <template slot-scope="scope">
          <span>{{ scope.row.picture }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.releasetime }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="文章状态" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.isrelease | statusFilter">
            {{ status[row.isrelease] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/announcement/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />
  </div>
</template>

<script>
import { fetchNewsList, searchNews } from '@/api/news'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
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
        pageSize: 20,
        title: '',
        catalog: '',
        isrelease: undefined,
        releasetime: '1999/1/1'
      },
      catalogOptions: [
        { key: 'news', display_name: '新闻' },
        { key: 'notice', display_name: '公告' },
        { key: 'buy', display_name: '购买' },
        { key: 'try', display_name: '试用' },
        { key: 'lecture', display_name: '讲座' },
        { key: 'activity', display_name: '活动' }
      ],
      statusOptions: [
        { key: '0', display_name: '草稿' },
        { key: '1', display_name: '发布' }
        // { key: '2', display_name: '已删除' }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchNewsList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },

    handleFilter() {
      this.listLoading = true
      // console.log(this.listQuery)
      searchNews(this.listQuery).then(response => {
        // console.log(response)
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

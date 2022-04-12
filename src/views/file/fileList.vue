<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 08:59:42
 * @LastEditTime: 2022-04-12 10:59:57
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.oldFileName" placeholder="原文件名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.fileName" placeholder="转储文件名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.fileType" placeholder="文件类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in fileTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="$router.push('/file/upload')">
        上传文件
      </el-button>
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
      <el-table-column label="原文件名" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.oldFileName }}
        </template>
      </el-table-column>
      <el-table-column label="转储文件名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fileType | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存储位置" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.filePath }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary">
            查看
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

  </div>
</template>

<script>
import { fetchFileList, deleteFileById, searchFile } from '@/api/file'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReaderTable',
  components: { Pagination },
  filters: {
    typeFilter(type) {
      const typeMap = {
        picture: '图片',
        file: '文件',
        vidio: '视频'
      }
      return typeMap[type]
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
        fileName: '',
        fileType: '',
        oldFileName: ''
      },
      fileTypeOptions: [
        { key: 'picture', display_name: '图片' },
        { key: 'file', display_name: '文件' },
        { key: 'vidio', display_name: '视频' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchFileList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listLoading = true
      console.log('this.listQuery', this.listQuery)
      searchFile(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    handleDelete(row) {
      deleteFileById(row.id).then(() => {
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

<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 08:59:42
 * @LastEditTime: 2022-04-20 10:02:22
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
          <el-button size="mini" type="primary" @click="handlePreview(row)">
            查看
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog title="预览" :visible.sync="dialogFormVisible" :before-close="beforeClose">
      <div v-if="temp.fileType === 'picture'">
        <h3>原文件名：{{ temp.oldFileName }}</h3>
        <h3>转储文件名：{{ temp.fileName }}</h3>
        <img :src="getPic + temp.fileName" alt="图片预览" style="width: 100%">
      </div>
      <div v-if="temp.fileType === 'video'">
        <h3>原文件名：{{ temp.oldFileName }}</h3>
        <h3>转储文件名：{{ temp.fileName }}</h3>
        <video :src="getVideo + temp.fileName" controls="controls" style="width: 100%">
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchFileList, deleteFileById, searchFile, getPic, getVideo, download } from '@/api/file'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReaderTable',
  components: { Pagination },
  filters: {
    typeFilter(type) {
      const typeMap = {
        picture: '图片',
        file: '文件',
        video: '视频'
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
        { key: 'video', display_name: '视频' }
      ],
      temp: {
        fileName: '',
        fileType: '',
        oldFileName: ''
      },
      dialogFormVisible: false,
      getPic,
      getVideo
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchFileList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listLoading = true
      // console.log('this.listQuery', this.listQuery)
      searchFile(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageinfo.list
        this.total = response.data.pageinfo.total
        this.listLoading = false
      })
    },
    handleDelete(row) {
      deleteFileById(row.id).then(() => {
        this.dialogFormVisible = false
        this.handleFilter()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handlePreview(row) {
      switch (row.fileType) {
        case 'picture':
          this.dialogFormVisible = true
          this.temp.fileName = row.fileName
          this.temp.fileType = row.fileType
          this.temp.oldFileName = row.oldFileName
          break
        case 'file':
          window.open(download + '?fileName=' + row.fileName)
          break
        case 'video':
          this.dialogFormVisible = true
          this.temp.fileName = row.fileName
          this.temp.fileType = row.fileType
          this.temp.oldFileName = row.oldFileName
          break
        default:
          break
      }
      // console.log(row)
    },
    resetTemp() {
      this.temp = {
        fileName: '',
        fileType: '',
        oldFileName: ''
      }
    },
    beforeClose() {
      this.dialogFormVisible = false
      this.resetTemp()
    }
  }
}
</script>

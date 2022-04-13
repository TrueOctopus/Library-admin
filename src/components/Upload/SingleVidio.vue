<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 20:30:17
 * @LastEditTime: 2022-04-13 09:38:25
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <el-upload
    class="upload-demo"
    action="http://localhost:8081/fileUpload/uploadVideoAction"
    :headers="{'token': $store.getters.token}"
    :on-remove="handleRemove"
    :on-success="handleImageSuccess"
    :before-upload="beforeUpload"
    :file-list="fileList"
    name="oneFile"
  >
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload">视频上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传MP4格式视频，大小不超过500M</div>
  </el-upload>
</template>

<script>
import { deleteFileByUuid } from '@/api/file'

export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      deleteFileByUuid(file.response.data.newFileName)
      this.fileList = fileList
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      // console.log(file, fileList)
    },
    handleImageSuccess(response, file, fileList) {
      this.$notify({
        title: '成功',
        message: response.msg,
        type: 'success',
        duration: 2000
      })
      this.fileList = fileList
      // console.log('Success', response, file, fileList)
      // console.log(file)
    },
    beforeUpload(file) {
      console.log('before', file)
      if (file.type !== 'video/mp4' || file.size > 1024 * 1024 * 500) {
        this.$message.error('只能上传MP4格式视频，大小不超过500M')
        return false
      }
    }
  }
}
</script>

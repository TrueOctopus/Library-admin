<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 20:00:15
 * @LastEditTime: 2022-04-29 16:45:59
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <el-upload
    class="upload-demo"
    :action="uploadUrl"
    :headers="{'token': $store.getters.token}"
    :on-remove="handleRemove"
    :on-success="handleImageSuccess"
    multiple
    :before-upload="beforeUpload"
    :file-list="fileList"
    name="oneFile"
  >
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload">文件上传</el-button>
    <div slot="tip" class="el-upload__tip">大小不超过100M</div>
  </el-upload>
</template>

<script>
import { deleteFileByUuid } from '@/api/file'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      uploadUrl: process.env.VUE_APP_BASE_API + '/fileUpload/uploadFileAction'
    }
  },
  watch: {
    value(val) {
      this.fileList = JSON.parse(val)
    },
    fileList(val) {
      this.$emit('input', JSON.stringify(val))
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
      this.fileList = fileList
      this.$notify({
        title: '成功',
        message: response.msg,
        type: 'success',
        duration: 2000
      })
      // console.log('Success', file, fileList)
      // console.log(file)
    },
    beforeUpload(file) {
      if (file.size > 1024 * 1024 * 100) {
        this.$message.error('文件大小不能超过100M')
        return false
      }
      // console.log('before', file)
    }
  }
}
</script>

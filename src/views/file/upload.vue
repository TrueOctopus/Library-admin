<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 09:22:29
 * @LastEditTime: 2022-04-12 19:08:59
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      action="http://localhost:8081/fileUpload/uploadPictureAction"
      :headers="{'token': $store.getters.token}"
      :on-success="handleImageSuccess"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      name="oneFile"
    >
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload">图片上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件</div>
    </el-upload>

    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload">
      文件上传
    </el-button>
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload">
      视频上传
    </el-button>
  </div>
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
      console.log(file, fileList)
    },
    handleImageSuccess(file) {
      console.log(file)
    }
  }
}
</script>

<style>

</style>

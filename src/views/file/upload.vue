<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 09:22:29
 * @LastEditTime: 2022-04-12 09:35:17
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件</div>
    </el-upload>
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload" @click="uploadPic">
      图片上传
    </el-button>
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload" @click="uploadFile">
      文件上传
    </el-button>
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload" @click="uploadVid">
      视频上传
    </el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

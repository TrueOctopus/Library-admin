<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 09:22:29
 * @LastEditTime: 2022-04-12 20:46:28
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8"><ImageList /></el-col>
      <el-col :span="8"><FileList /></el-col>
      <el-col :span="8"><SingleVidio /></el-col>
    </el-row>

  </div>
</template>

<script>
import ImageList from '@/components/Upload/ImageList'
import FileList from '@/components/Upload/FileList'
import SingleVidio from '@/components/Upload/SingleVidio'
export default {
  components: { ImageList, FileList, SingleVidio }
}
</script>

<style>

</style>

<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 19:21:44
 * @LastEditTime: 2022-04-13 09:27:55
 * @LastEditors: 郑钊宇
 * @Description:
-->
<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 09:22:29
 * @LastEditTime: 2022-04-12 19:20:33
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <el-upload
    class="upload-demo"
    action="http://localhost:8081/fileUpload/uploadPictureAction"
    :headers="{'token': $store.getters.token}"
    :on-success="handleImageSuccess"
    :on-remove="handleRemove"
    :file-list="fileList"
    :before-upload="beforeUpload"
    multiple
    :limit="10"
    :on-exceed="handleExceed"
    list-type="picture"
    name="oneFile"
  >
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload">图片上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件,并且不能超过5M</div>
  </el-upload>
</template>

<script>
import { deleteFileByUuid } from '@/api/file'

export default {
  name: 'ImageListUpload',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      deleteFileByUuid(file.response.data.newFileName)
      this.fileList = fileList
      // console.log('remove', file, fileList)
    },
    handleImageSuccess(response, file, fileList) {
      this.fileList = fileList
      // console.log('Success', response, file, fileList)
      // console.log(file)
    },
    beforeUpload(file) {
      // console.log('before', file)
      if ((file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') || file.size > 1024 * 1024 * 5) {
        this.$message.error('只能上传jpg/png/gif文件,并且不能超过5M')
        return false
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>

<style>

</style>

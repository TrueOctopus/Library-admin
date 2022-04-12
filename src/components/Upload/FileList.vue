<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-12 20:00:15
 * @LastEditTime: 2022-04-12 20:26:52
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <el-upload
    class="upload-demo"
    action="http://localhost:8081/fileUpload/uploadFileAction"
    :headers="{'token': $store.getters.token}"
    :on-remove="handleRemove"
    multiple
    :limit="10"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :file-list="fileList"
    name="oneFile"
  >
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload">文件上传</el-button>
    <div slot="tip" class="el-upload__tip">大小不超过100M,数量不超过10个</div>
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
      // console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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

<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" label-position="left" class="form-container">
      <sticky :z-index="10" class-name="sub-navbar published">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px;" prop="catalog">
              <MDinput v-model="postForm.catalog" :maxlength="100" name="catalog" :disabled="isEdit" required>
                页面位置 <span v-show="isEdit" style="color:#c52525">(禁止修改)</span>
              </MDinput>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="title" required>
                文章标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item prop="picture" style="margin-bottom: 30px;" label="文章图片:">
          <Upload v-model="postForm.picture" />
        </el-form-item>
      </div>
    </el-form>

    <div class="editor-content">附件上传：</div>
    <div class="editor-content" style="width:40%">
      <FileList v-model="postForm.appendix" />
    </div>

    <div class="editor-content">文章预览：</div>
    <div class="editor-content" v-html="postForm.content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchPageDetailById, fetchPageByCatalog, updatePages, addPages } from '@/api/pages'
// import { uploadPicture } from '@/api/file'
import Warning from './Warning'
import FileList from '@/components/Upload/FileList'

const defaultForm = {
  title: '', // 文章题目
  content: '', // 文章内容
  picture: '', // 文章图片
  catalog: '', // 类型
  appendix: '', // 附件列表
  id: undefined
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, FileList },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      pictureData: undefined,
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        catalog: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  created() {
    // console.log('this.$route.meta', this.$route.meta)
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      if (id) this.fetchData(id)
      else this.fetchDataByCatalog(this.$route.meta.title)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchPageDetailById(id).then(response => {
        // console.log(response)
        this.postForm = response.data.text
        // just for test
        // this.postForm.title += `   Article Id:${this.postForm.id}`
        // this.postForm.remark += `   Article Id:${this.postForm.id}`

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    fetchDataByCatalog(catalog) {
      fetchPageByCatalog(catalog).then(response => {
        // console.log(response)
        this.postForm = response.data.pageinfo.list[0]
        // console.log('this.postForm', this.postForm)
        // just for test
        // this.postForm.title += `   Article Id:${this.postForm.id}`
        // this.postForm.remark += `   Article Id:${this.postForm.id}`

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setPageTitle() {
      const title = '编辑文章'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      // console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          delete this.postForm['createtime']
          delete this.postForm['updatetime']
          if (this.isEdit) {
            updatePages(this.postForm).then(response => {
            // console.log(response)
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            })
          } else {
            addPages(this.postForm).then(response => {
            // console.log(response)
              this.$notify({
                title: '成功',
                message: '添加文章成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            })
          }
        } else {
          // console.log('提交错误!!')
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.editor-content{
  margin: 20px 50px;
}
</style>

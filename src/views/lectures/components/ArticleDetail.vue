<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-03 08:47:17
 * @LastEditTime: 2022-04-04 10:54:28
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" label-position="left" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+statusMap[postForm.isrelease]">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm(1)">
          发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="submitForm(0)">
          存草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="tittle" required>
                文章标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="120px" label="文章类型:" class="postInfo-container-item" prop="catalog">
                    <el-select v-model="postForm.catalog" class="filter-item" placeholder="点击选择">
                      <el-option v-for="item in catalogOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="举办时间:" class="postInfo-container-item" prop="lecturetime">
                    <el-date-picker v-model="lectureTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期与时间" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item" prop="releasetime">
                    <el-date-picker v-model="releaseTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期与时间" />
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="110px" label="活动讲座简要:" prop="remark">
          <el-input v-model="postForm.remark" :rows="1" type="textarea" class="article-textarea" autosize placeholder="请输入摘要内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }} 字</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item prop="picture" style="margin-bottom: 30px;" label="文章图片:">
          <Upload v-model="postForm.picture" />
        </el-form-item>
      </div>
    </el-form>
    <div class="editor-content">文章预览：</div>
    <div class="editor-content" v-html="postForm.content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchLecturesDetailById, updateLectures, addLectures } from '@/api/lectures'
import Warning from './Warning'

const defaultForm = {
  title: '', // 文章题目
  content: '', // 文章内容
  remark: '', // 文章摘要
  picture: '', // 文章图片
  catalog: '讲座', // 类型
  lecturetime: new Date(), // 举办时间
  releasetime: new Date(), // 发布时间
  isrelease: 0,
  id: undefined
}

export default {
  name: 'LecturesDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning },
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
        remark: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        catalog: [{ validator: validateRequire }]
      },
      statusMap: ['draft', 'published', 'deleted'],
      catalogOptions: ['讲座', '活动'],
      tempRoute: {},
      release_time: new Date(),
      lecture_time: new Date()
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.remark.length
    },
    releaseTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.release_time))
      },
      set(val) {
        this.release_time = new Date(val)
        this.postForm.releasetime = this.release_time
      }
    },
    lectureTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.lecture_time))
      },
      set(val) {
        this.lecture_time = new Date(val)
        this.postForm.lecturetime = this.lecture_time
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchLecturesDetailById(id).then(response => {
        // console.log(response)
        this.postForm = response.data.lecture
        this.postForm.releasetime = new Date(response.data.lecture.releasetime)
        this.postForm.lecturetime = new Date(response.data.lecture.lecturetime)
        this.release_time = this.postForm.releasetime
        this.lecture_time = this.postForm.lecturetime
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
    submitForm(isrelease) {
      // console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          // this.loading = true
          // uploadPicture(this.pictureData).then(response => {
          //   console.log(response)
          // })

          this.postForm.isrelease = isrelease
          delete this.postForm['createtime']
          delete this.postForm['updatetime']
          if (this.isEdit) {
            updateLectures(this.postForm).then(response => {
              // console.log(response)
              this.$notify({
                title: '成功',
                message: isrelease === 1 ? '发布文章成功' : '已存为草稿',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            })
          } else {
            addLectures(this.postForm).then(response => {
              // console.log(response)
              this.$notify({
                title: '成功',
                message: isrelease === 1 ? '发布文章成功' : '已存为草稿',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            })
          }
        } else {
          console.log('提交错误!!')
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

<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-01 10:39:44
 * @LastEditTime: 2022-04-26 16:46:54
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <aside>
    注意事项：<br>
    ① 底部文章预览中的图片可能与实际会有差异，主要是图片的垂直居中问题，尽量避免同列图片的高度不一致；<br>
    ② 此处文章图片为必传项，为书籍的封面图，尽量选择白边不多的图片以免影响观感；<br>
    ③ 在文章中添加图片可以使用右上角的图片上传，如果想引用已经上传的图片，可选择 插入>图片 地址处填写对应的链接，本系统图片地址为：{{ getPic }} + 新文件名。<br>
  </aside>
</template>
<script>
import { getPic } from '@/api/file'
export default {
  name: 'Warning',
  data() {
    return {
      getPic
    }
  }
}
</script>

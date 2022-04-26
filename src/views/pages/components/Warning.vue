<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-01 10:39:44
 * @LastEditTime: 2022-04-26 16:46:43
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <aside>
    注意事项：<br>
    ① 附件上传后如果放弃编辑会导致文件残留，建议放弃编辑前删除，或者去文件管理页面清理；<br>
    ② 底部文章预览中的图片可能与实际会有差异，主要是图片的垂直居中问题，尽量避免同列图片的高度不一致；<br>
    ③ 页面位置必须和门户网站中<b>pageInfo</b>组件中的<b>catalog</b>变量相同，否则会出现页面不显示的问题；<br>
    ④ 编写单独的页面编辑时需要在对应路由设置中的meta添加title字段，值为页面位置；<br>
    ⑤ 页面一览与新建文章页面不对非管理员用户开放，添加页面后需要去门户网站的源码中添加对应代码（后续迭代可尝试动态的路由挂载）；<br>
    ⑥ 在文章中添加图片可以使用右上角的图片上传，如果想引用已经上传的图片，可选择 插入>图片 地址处填写对应的链接，本系统图片地址为：{{ getPic }} + 新文件名。<br>
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


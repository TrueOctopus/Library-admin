<!--
 * @Author: 郑钊宇
 * @Date: 2022-04-01 10:39:44
 * @LastEditTime: 2022-04-26 15:38:19
 * @LastEditors: 郑钊宇
 * @Description:
-->
<template>
  <aside>
    注意事项：<br>
    ① 上传后会生成一个缓存列表，可点击右边的 x 删除；<br>
    ② 上传后如果离开页面缓存列表会消失，如需删除请去文件列表页面删除；<br>
    ③ 需要手动引用文件或者图片视频时需要添加链接，链接如下：<br>
    文件：{{ download }}?fileName= + 新文件名<br>
    图片：{{ getPic }} + 新文件名<br>
    视频：{{ getVideo }} + 新文件名<br>
    <b>例如：</b>{{ getPic }}d0a9fa7965db42228a30ef40f0dbcfef.jpg

  </aside>
</template>
<script>
import { download, getPic, getVideo } from '@/api/file'
export default {
  name: 'Warning',
  data() {
    return {
      download,
      getPic,
      getVideo
    }
  }
}
</script>

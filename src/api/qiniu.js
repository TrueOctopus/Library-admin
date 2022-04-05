/**
 * @Author: 郑钊宇
 * @Date: 2022-04-05 10:32:15
 * @LastEditTime: 2022-04-05 10:32:16
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}

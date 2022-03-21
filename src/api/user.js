/**
 * @Author: 郑钊宇
 * @Date: 2022-03-16 08:44:06
 * @LastEditTime: 2022-03-16 19:49:02
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    // url: '/management/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

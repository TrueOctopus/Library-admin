/**
 * @Author: 郑钊宇
 * @Date: 2022-03-16 08:44:06
 * @LastEditTime: 2022-04-04 08:15:41
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/userBackstage/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/token/parseToken',
    method: 'post',
    data: {
      'tokenStr': token
    }
  })
}

export function fetchUserList({ pageNo, pageSize }) {
  return request({
    url: '/userBackstage/userinfo',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function fetchUserById(userId) {
  return request({
    url: '/userBackstage/userinfo',
    method: 'get',
    params: { userId }
  })
}

export function deleteUserById(userId) {
  return request({
    url: '/userBackstage/deleteUser',
    method: 'post',
    data: { 'id': userId }
  })
}

export function addUser(data) {
  return request({
    url: '/userBackstage/addAdministrator',
    method: 'post',
    data
  })
}
export function userUpdate(data) {
  return request({
    url: '/userBackstage/userUpdate',
    method: 'post',
    data
  })
}

export function searchUser(params) {
  return request({
    url: '/userBackstage/userinfo',
    method: 'get',
    params
  })
}


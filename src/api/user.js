/**
 * @Author: 郑钊宇
 * @Date: 2022-03-16 08:44:06
 * @LastEditTime: 2022-04-01 10:04:31
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
    url: '/userBackstage/userlist',
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
    url: '/userAction/register',
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

export function fetchUserByName({ pageNo, pageSize, search }) {
  return request({
    url: '/userBackstage/searchByName',
    method: 'get',
    params: { pageNo, pageSize, search }
  })
}

export function fetchUserByJurisdiction({ pageNo, pageSize, jurisdiction }) {
  return request({
    url: '/userBackstage/searchByJurisdiction',
    method: 'get',
    params: { pageNo, pageSize, jurisdiction }
  })
}

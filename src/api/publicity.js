/**
 * @Author: 郑钊宇
 * @Date: 2022-04-04 15:14:18
 * @LastEditTime: 2022-04-04 15:16:51
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchPublicityList({ pageNo, pageSize }) {
  return request({
    url: '/recommendBackstage/recommendSearch',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchPublicity(params) {
  return request({
    url: '/recommendBackstage/recommendSearch',
    method: 'get',
    params
  })
}

export function fetchPublicityDetailById(id) {
  return request({
    url: '/recommendBackstage/recommendSearch',
    method: 'get',
    params: { id }
  })
}

export function addPublicity(data) {
  return request({
    url: '/recommendBackstage/insert',
    method: 'post',
    data
  })
}

export function updatePublicity(data) {
  return request({
    url: '/recommendBackstage/update',
    method: 'post',
    data
  })
}

export function deletePublicity(id) {
  return request({
    url: '/recommendBackstage/delete',
    method: 'post',
    data: { id }
  })
}

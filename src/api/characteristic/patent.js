/**
 * @Author: 郑钊宇
 * @Date: 2022-04-23 09:56:08
 * @LastEditTime: 2022-04-23 09:57:50
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchPatentById(id) {
  return request({
    url: '/acaBackstage/patent/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchPatentList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/patent/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchPatent(params) {
  return request({
    url: '/acaBackstage/patent/Search',
    method: 'get',
    params
  })
}

export function addPatent(data) {
  return request({
    url: '/acaBackstage/patent/addAcaPatentAction',
    method: 'post',
    data
  })
}

export function deletePatent(id) {
  return request({
    url: '/acaBackstage/patent/deleteAcaPatent',
    method: 'post',
    data: { id }
  })
}

export function updatePatent(data) {
  return request({
    url: '/acaBackstage/patent/updateAcaPatentAction',
    method: 'post',
    data
  })
}

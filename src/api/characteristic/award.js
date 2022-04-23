/**
 * @Author: 郑钊宇
 * @Date: 2022-04-23 10:53:48
 * @LastEditTime: 2022-04-23 10:56:35
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchAwardById(id) {
  return request({
    url: '/acaBackstage/award/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchAwardList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/award/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchAward(params) {
  return request({
    url: '/acaBackstage/award/Search',
    method: 'get',
    params
  })
}

export function addAward(data) {
  return request({
    url: '/acaBackstage/award/addAcaAwardAction',
    method: 'post',
    data
  })
}

export function deleteAward(id) {
  return request({
    url: '/acaBackstage/award/deleteAcaAward',
    method: 'post',
    data: { id }
  })
}

export function updateAward(data) {
  return request({
    url: '/acaBackstage/award/updateAcaAwardAction',
    method: 'post',
    data
  })
}

/**
 * @Author: 郑钊宇
 * @Date: 2022-04-23 10:07:26
 * @LastEditTime: 2022-04-23 10:08:58
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchPapersById(id) {
  return request({
    url: '/acaBackstage/papers/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchPapersList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/papers/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchPapers(params) {
  return request({
    url: '/acaBackstage/papers/Search',
    method: 'get',
    params
  })
}

export function addPapers(data) {
  return request({
    url: '/acaBackstage/papers/addAcaPapersAction',
    method: 'post',
    data
  })
}

export function deletePapers(id) {
  return request({
    url: '/acaBackstage/papers/deleteAcaPapers',
    method: 'post',
    data: { id }
  })
}

export function updatePapers(data) {
  return request({
    url: '/acaBackstage/papers/updateAcaPapersAction',
    method: 'post',
    data
  })
}

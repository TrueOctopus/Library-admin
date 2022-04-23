/**
 * @Author: 郑钊宇
 * @Date: 2022-04-23 10:23:25
 * @LastEditTime: 2022-04-23 10:27:44
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchTechnologyById(id) {
  return request({
    url: '/acaBackstage/technology/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchTechnologyList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/technology/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchTechnology(params) {
  return request({
    url: '/acaBackstage/technology/Search',
    method: 'get',
    params
  })
}

export function addTechnology(data) {
  return request({
    url: '/acaBackstage/technology/addAcaTechnologyAction',
    method: 'post',
    data
  })
}

export function deleteTechnology(id) {
  return request({
    url: '/acaBackstage/technology/deleteAcaTechnology',
    method: 'post',
    data: { id }
  })
}

export function updateTechnology(data) {
  return request({
    url: '/acaBackstage/technology/updateAcaTechnologyAction',
    method: 'post',
    data
  })
}

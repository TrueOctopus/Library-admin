/**
 * @Author: 郑钊宇
 * @Date: 2022-04-04 16:03:51
 * @LastEditTime: 2022-04-04 16:20:34
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchPageByCatalog({ pageNo, pageSize, catalog }) {
  return request({
    url: '/backstage/text/recommendSearch',
    method: 'get',
    params: { pageNo, pageSize, catalog }
  })
}

export function fetchPageDetailById(id) {
  return request({
    url: '/backstage/text/recommendSearch',
    method: 'get',
    params: { id }
  })
}

export function fetchPagesList({ pageNo, pageSize }) {
  return request({
    url: '/backstage/text/recommendSearch',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchPages(params) {
  return request({
    url: '/backstage/text/recommendSearch',
    method: 'get',
    params
  })
}

export function addPages(data) {
  return request({
    url: '/backstage/text/addTextAction',
    method: 'post',
    data
  })
}

export function updatePages(data) {
  return request({
    url: '/backstage/text/updateTextAction',
    method: 'post',
    data
  })
}

export function deletePages(id) {
  return request({
    url: '/backstage/text/deleteText',
    method: 'post',
    data: { id }
  })
}

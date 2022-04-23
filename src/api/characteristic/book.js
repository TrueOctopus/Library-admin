/**
 * @Author: 郑钊宇
 * @Date: 2022-04-23 11:17:23
 * @LastEditTime: 2022-04-23 11:17:46
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchBookById(id) {
  return request({
    url: '/acaBackstage/book/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchBookList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/book/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchBook(params) {
  return request({
    url: '/acaBackstage/book/Search',
    method: 'get',
    params
  })
}

export function addBook(data) {
  return request({
    url: '/acaBackstage/book/addAcaBookAction',
    method: 'post',
    data
  })
}

export function deleteBook(id) {
  return request({
    url: '/acaBackstage/book/deleteAcaBook',
    method: 'post',
    data: { id }
  })
}

export function updateBook(data) {
  return request({
    url: '/acaBackstage/book/updateAcaBookAction',
    method: 'post',
    data
  })
}

/**
 * @Author: 郑钊宇
 * @Date: 2022-04-09 14:23:25
 * @LastEditTime: 2022-04-09 14:33:05
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchCommentList({ pageNo, pageSize }) {
  return request({
    url: '/commentBackstage/commentSearch',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function fetchCommentById({ id }) {
  return request({
    url: '/commentBackstage/commentSearch',
    method: 'get',
    params: { id }
  })
}

export function searchComment(params) {
  return request({
    url: '/commentBackstage/commentSearch',
    method: 'get',
    params
  })
}

export function updateComment(data) {
  return request({
    url: '/commentBackstage/commentList/update',
    method: 'post',
    data
  })
}

export function deleteComment(id) {
  return request({
    url: '/commentBackstage/commentList/delete',
    method: 'post',
    data: { id }
  })
}

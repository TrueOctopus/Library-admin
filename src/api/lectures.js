/**
 * @Author: 郑钊宇
 * @Date: 2022-04-02 20:16:23
 * @LastEditTime: 2022-04-04 10:58:44
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchLecturesList({ pageNo, pageSize }) {
  return request({
    url: '/lectureBackstage/lectureSearch',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchLectures(params) {
  return request({
    url: '/lectureBackstage/lectureSearch',
    method: 'get',
    params
  })
}

export function fetchLecturesDetailById(id) {
  return request({
    url: '/lectureBackstage/lectureSearch',
    method: 'get',
    params: { id }
  })
}

export function updateLectures(data) {
  return request({
    url: '/lectureBackstage/lectureList/update',
    method: 'post',
    data
  })
}

export function addLectures(data) {
  return request({
    url: '/lectureBackstage/lectureList/insert',
    method: 'post',
    data
  })
}

export function deleteLectures(id) {
  return request({
    url: '/lectureBackstage/lectureList/delete',
    method: 'post',
    data: { id }
  })
}

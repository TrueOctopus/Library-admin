/**
 * @Author: 郑钊宇
 * @Date: 2022-04-02 20:16:23
 * @LastEditTime: 2022-04-02 20:29:20
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchLecturesList() {
  return request({
    url: '/lectureBackstage/lectureList',
    method: 'get'
    // params: { pageNo, pageSize }
  })
}

export function fetchLecturesDetailById(id) {
  return request({
    url: '/lectureBackstage/lectureList/one',
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

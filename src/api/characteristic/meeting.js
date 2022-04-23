/**
 * @Author: 郑钊宇
 * @Date: 2022-04-23 10:34:14
 * @LastEditTime: 2022-04-23 10:35:36
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchMeetingById(id) {
  return request({
    url: '/acaBackstage/meeting/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchMeetingList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/meeting/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchMeeting(params) {
  return request({
    url: '/acaBackstage/meeting/Search',
    method: 'get',
    params
  })
}

export function addMeeting(data) {
  return request({
    url: '/acaBackstage/meeting/addAcaMeetingAction',
    method: 'post',
    data
  })
}

export function deleteMeeting(id) {
  return request({
    url: '/acaBackstage/meeting/deleteAcaMeeting',
    method: 'post',
    data: { id }
  })
}

export function updateMeeting(data) {
  return request({
    url: '/acaBackstage/meeting/updateAcaMeetingAction',
    method: 'post',
    data
  })
}

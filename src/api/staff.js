/**
 * @Author: 郑钊宇
 * @Date: 2022-04-05 09:15:32
 * @LastEditTime: 2022-04-05 09:19:11
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchStaffList({ pageNo, pageSize }) {
  return request({
    url: '/workerTableBackstage/inquire',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function fetchStaffById(id) {
  return request({
    url: '/workerTableBackstage/inquire',
    method: 'get',
    params: { id }
  })
}

export function deleteStaffById(id) {
  return request({
    url: '/workerTableBackstage/delete',
    method: 'post',
    data: { id }
  })
}

export function addStaff(data) {
  return request({
    url: '/workerTableBackstage/databaseList/insert',
    method: 'post',
    data
  })
}
export function staffUpdate(data) {
  return request({
    url: '/workerTableBackstage/update',
    method: 'post',
    data
  })
}

export function searchStaff(params) {
  return request({
    url: '/workerTableBackstage/inquire',
    method: 'get',
    params
  })
}

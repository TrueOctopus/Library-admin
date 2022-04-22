/**
 * @Author: 郑钊宇
 * @Date: 2022-04-22 10:54:33
 * @LastEditTime: 2022-04-22 12:01:53
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchProjectReportById(id) {
  return request({
    url: '/acaBackstage/projectReport/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchProjectReportList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/projectReport/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchProjectReport(params) {
  return request({
    url: '/acaBackstage/projectReport/Search',
    method: 'get',
    params
  })
}

export function addProjectReport(data) {
  return request({
    url: '/acaBackstage/projectReport/addAcaProjectReportAction',
    method: 'post',
    data
  })
}

export function deleteProjectReport(id) {
  return request({
    url: '/acaBackstage/projectReport/deleteAcaProjectReport',
    method: 'post',
    data: { id }
  })
}

export function updateProjectReport(data) {
  return request({
    url: '/acaBackstage/projectReport/updateAcaProjectReportAction',
    method: 'post',
    data
  })
}

/**
 * @Author: 郑钊宇
 * @Date: 2022-03-30 08:52:27
 * @LastEditTime: 2022-04-04 09:09:50
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchDatabaseList({ pageNo, pageSize }) {
  return request({
    url: '/databaseBackstage/databaseList',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchDatabase(params) {
  return request({
    url: '/databaseBackstage/databaseList',
    method: 'get',
    params
  })
}
export function updateDatabaseList(data) {
  return request({
    url: '/databaseBackstage/databaseList/update',
    method: 'post',
    data
  })
}

export function deleteDatabaseList(id) {
  return request({
    url: '/databaseBackstage/databaseList/delete',
    method: 'post',
    data: { id }
  })
}

export function insertDatabaseList(data) {
  return request({
    url: '/databaseBackstage/databaseList/insert',
    method: 'post',
    data
  })
}

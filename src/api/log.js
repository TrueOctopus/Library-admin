/**
 * @Author: 郑钊宇
 * @Date: 2022-04-24 20:00:15
 * @LastEditTime: 2022-04-25 14:16:56
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function logSearch({ pageNo, pageSize }) {
  return request({
    url: '/log/logSearch',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function timeSearchLog({ pageNo, pageSize, initialTime, endTime }) {
  return request({
    url: '/log/timeSearch',
    method: 'get',
    params: { pageNo, pageSize, initialTime, endTime }
  })
}

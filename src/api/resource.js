/**
 * @Author: 郑钊宇
 * @Date: 2022-03-30 08:52:27
 * @LastEditTime: 2022-03-30 09:08:31
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchDatabaseList() {
  return request({
    url: '/database/databaseList',
    method: 'get'
  })
}

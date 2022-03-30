/**
 * @Author: 郑钊宇
 * @Date: 2022-03-28 10:31:04
 * @LastEditTime: 2022-03-28 10:38:10
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchNewsByCatalog(pageNo, pageSize, catalog) {
  return request({
    url: '/news/textByCatalog',
    method: 'get',
    params: { pageNo, pageSize, catalog }
  })
}

export function fetchNewsList(pageNo, pageSize) {
  return request({
    url: '/news/newsFour',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function fetchNewsDetailById(id) {
  return request({
    url: '/news/detailed',
    method: 'get',
    params: { id }
  })
}

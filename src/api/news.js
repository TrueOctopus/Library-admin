/**
 * @Author: 郑钊宇
 * @Date: 2022-03-28 10:31:04
 * @LastEditTime: 2022-04-01 20:33:08
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function fetchNewsByCatalog({ pageNo, pageSize, catalog }) {
  return request({
    url: '/backstage/news/textByCatalog',
    method: 'get',
    params: { pageNo, pageSize, catalog }
  })
}

export function fetchNewsList({ pageNo, pageSize }) {
  return request({
    url: '/backstage/news/news',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function fetchNewsDetailById(id) {
  return request({
    url: '/backstage/news/detailed',
    method: 'get',
    params: { id }
  })
}

export function addNews(data) {
  return request({
    url: '/backstage/news/addNewsAction',
    method: 'post',
    data
  })
}

export function updateNews(data) {
  return request({
    url: '/backstage/news/updateNewsAction',
    method: 'post',
    data
  })
}

export function deleteNews(id) {
  return request({
    url: '/backstage/news/updateNewsAction',
    method: 'post',
    data: { id }
  })
}

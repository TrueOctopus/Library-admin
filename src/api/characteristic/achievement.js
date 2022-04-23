/**
 * @Author: 郑钊宇
 * @Date: 2022-04-23 11:26:49
 * @LastEditTime: 2022-04-23 11:34:44
 * @LastEditors: 郑钊宇
 * @Description:
 */

import request from '@/utils/request'

export function fetchAchievementById(id) {
  return request({
    url: '/acaBackstage/achievement/Search',
    method: 'get',
    params: { id }
  })
}

export function fetchAchievementList({ pageNo, pageSize }) {
  return request({
    url: '/acaBackstage/achievement/Search',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchAchievement(params) {
  return request({
    url: '/acaBackstage/achievement/Search',
    method: 'get',
    params
  })
}

export function addAchievement(data) {
  return request({
    url: '/acaBackstage/achievement/addAcaAchievementAction',
    method: 'post',
    data
  })
}

export function deleteAchievement(id) {
  return request({
    url: '/acaBackstage/achievement/deleteAcaAchievement',
    method: 'post',
    data: { id }
  })
}

export function updateAchievement(data) {
  return request({
    url: '/acaBackstage/achievement/updateAcaAchievementAction',
    method: 'post',
    data
  })
}

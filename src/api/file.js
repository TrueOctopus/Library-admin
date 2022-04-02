/**
 * @Author: 郑钊宇
 * @Date: 2022-04-02 19:04:54
 * @LastEditTime: 2022-04-02 19:14:52
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/fileUpload/uploadFileAction',
    method: 'post',
    data
  })
}

export function uploadPicture(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/fileUpload/uploadPictureAction',
    method: 'post',
    data
  })
}

export function uploadVideo(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/fileUpload/uploadVideoAction',
    method: 'post',
    data
  })
}

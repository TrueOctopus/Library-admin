/**
 * @Author: 郑钊宇
 * @Date: 2022-04-02 19:04:54
 * @LastEditTime: 2022-04-02 20:24:08
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export function uploadFile(oneFile) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/fileUpload/uploadFileAction',
    method: 'post',
    data: { oneFile }
  })
}

export function uploadPicture(oneFile) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/fileUpload/uploadPictureAction',
    method: 'post',
    data: { oneFile }
  })
}

export function uploadVideo(oneFile) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/fileUpload/uploadVideoAction',
    method: 'post',
    data: { oneFile }
  })
}

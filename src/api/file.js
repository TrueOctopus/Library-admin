/**
 * @Author: 郑钊宇
 * @Date: 2022-04-02 19:04:54
 * @LastEditTime: 2022-04-12 18:31:16
 * @LastEditors: 郑钊宇
 * @Description:
 */
import request from '@/utils/request'

export const getPic = process.env.VUE_APP_BASE_API + '/getPhoto/'
export const getVid = process.env.VUE_APP_BASE_API + '/mp4/'

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

export function fetchFileList({ pageNo, pageSize }) {
  return request({
    url: '/uploadFileBackstage/fileSearch',
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function searchFile(params) {
  return request({
    url: '/uploadFileBackstage/fileSearch',
    method: 'get',
    params
  })
}

export function deleteFileById(id) {
  return request({
    url: '/uploadFileBackstage/deleteUploadFile',
    method: 'post',
    data: { id }
  })
}

export function deleteFileByUuid(uuid) {
  return request({
    url: '/uploadFileBackstage/deleteUploadFileByUUID',
    method: 'post',
    data: { uuid }
  })
}

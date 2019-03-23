import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/disease/list_disease',
    method: 'get',
    params: query
  })
}

export function getPrimary(name) {
  return request({
    url: '/disease/all_primary',
    method: 'get',
    params: { name }
  })
}

export function getSecondary(primary_name) {
  return request({
    url: '/disease/all_secondary',
    method: 'get',
    params: { primary_name }
  })
}

export function getDisease(secondary_name) {
  return request({
    url: '/disease/all_disease',
    method: 'get',
    params: { secondary_name }
  })
}

export function createDataForm(data) {
  return request({
    url: '/disease/add_disease',
    method: 'post',
    params: data
  })
}

export function updateDataForm(data) {
  return request({
    url: '/disease/edit_disease',
    method: 'post',
    data
  })
}

export function deleteDisease(id) {
  return request({
    url: '/disease/delete_disease',
    method: 'get',
    params: id
  })
}

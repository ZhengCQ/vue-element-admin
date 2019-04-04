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

export function createDataForm(results) {
  return request({
    url: '/disease/add_disease',
    method: 'post',
    params: { results }
  })
}

export function updateDataForm(results) {
  return request({
    url: '/disease/edit_disease',
    method: 'post',
    params: { results }
  })
}

export function deleteDisease(id) {
  return request({
    url: '/disease/delete_disease',
    method: 'get',
    params: id
  })
}

export function glistKnowlege(primary_name, knowlege_name) {
  return request({
    url: '/product/list_knowlege',
    method: 'get',
    params: { primary_name, knowlege_name }
  })
}

export function gfindRsName(rsName) {
  return request({
    url: '/query/find_rs_name',
    method: 'get',
    params: { rsName }
  })
}

export function recieveData(upload) {
  return request({
    url: '/product/recieve_data',
    method: 'post',
    params: { upload }
  })
}

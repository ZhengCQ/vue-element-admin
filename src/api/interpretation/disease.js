import request from '@/utils/request'

export function glistdisease(query) {
  return request({
    url: '/disease/list_disease',
    method: 'get',
    params: query
  })
}

export function gallPrimary(name) {
  return request({
    url: '/disease/all_primary',
    method: 'get',
    params: { name }
  })
}

export function gallSecondary(primary_name) {
  return request({
    url: '/disease/all_secondary',
    method: 'get',
    params: { primary_name }
  })
}

export function gallDisease(secondary_name) {
  return request({
    url: '/disease/all_disease',
    method: 'get',
    params: { secondary_name }
  })
}

export function paddDisease(results) {
  return request({
    url: '/disease/add_disease',
    method: 'post',
    params: { results }
  })
}

export function peditDisease(results) {
  return request({
    url: '/disease/edit_disease',
    method: 'post',
    params: { results }
  })
}

export function gdeleteDisease(id) {
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

export function precieveData(upload) {
  return request({
    url: '/product/recieve_data',
    method: 'post',
    params: { upload }
  })
}

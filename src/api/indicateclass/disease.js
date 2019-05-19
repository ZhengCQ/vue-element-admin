import request from '@/utils/request'

export function glistIndicateClass(query) {
  return request({
    url: '/disease/list_indicate_class',
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

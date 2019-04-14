import request from '@/utils/request'

export function glistAllPsersonal(query) {
  return request({
    url: '/personal/list_all_psersonal',
    method: 'get',
    params: query
  })
}

export function gdeleteIndicate(query) {
  return request({
    url: '/personal/delete_indicate',
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

export function gallPersonality(secondary_name) {
  return request({
    url: '/personal/all_personality',
    method: 'get',
    params: { secondary_name }
  })
}

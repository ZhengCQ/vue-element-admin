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

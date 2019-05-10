import request from '@/utils/request'

export function glistUser(query) {
  return request({
    url: '/user/list_user',
    method: 'get',
    params: query
  })
}

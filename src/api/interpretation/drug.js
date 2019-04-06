import request from '@/utils/request'

export function glistDrug(query) {
  return request({
    url: '/drug/list_drug',
    method: 'get',
    params: query
  })
}

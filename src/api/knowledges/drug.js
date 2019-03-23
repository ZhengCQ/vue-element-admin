import request from '@/utils/request'

export function glistKnowlege(query) {
  return request({
    url: '/drug/list_knowlege',
    method: 'get',
    params: query
  })
}

export function paddKnowlege(data) {
  return request({
    url: '/drug/add_knowlege',
    method: 'post',
    params: data
  })
}

export function peditKnowlege(data) {
  return request({
    url: '/drug/edit_knowlege',
    method: 'post',
    params: data
  })
}

export function pdeleteKnowlege(id) {
  return request({
    url: '/drug/delete_knowlege',
    method: 'post',
    params: id
  })
}

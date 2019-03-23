import request from '@/utils/request'

export function glistKnowlege(query) {
  return request({
    url: '/personal/list_knowlege',
    method: 'get',
    params: query
  })
}

export function paddKnowlege(data) {
  return request({
    url: '/personal/add_knowlege',
    method: 'post',
    params: data
  })
}

export function peditKnowlege(data) {
  return request({
    url: '/personal/edit_knowlege',
    method: 'post',
    params: data
  })
}

export function pdeleteKnowlege(id) {
  return request({
    url: '/personal/delete_knowlege',
    method: 'post',
    params: id
  })
}

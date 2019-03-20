import request from '@/utils/request'

export function glistKnowlege(query) {
  return request({
    url: '/disease/list_knowlege',
    method: 'get',
    params: query
  })
}

export function paddKnowlege(data) {
  return request({
    url: '/disease/add_knowlege',
    method: 'post',
    params: data
  })
}

export function peditKnowlege(data) {
  return request({
    url: '/disease/edit_knowlege',
    method: 'post',
    params: data
  })
}

export function pdeleteKnowlege(id) {
  return request({
    url: '/disease/delete_knowlege',
    method: 'post',
    params: id
  })
}

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

export function getSecondary(name) {
  return request({
    url: '/disease/all_secondary',
    method: 'get',
    params: { name }
  })
}

export function getDisease(name) {
  return request({
    url: '/disease/all_disease',
    method: 'get',
    params: { name }
  })
}

export function fetchProduct(id) {
  return request({
    url: '/product/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/product/pv',
    method: 'get',
    params: { pv }
  })
}

export function createDataForm(data) {
  return request({
    url: '/disease/add_disease',
    method: 'post',
    data
  })
}

export function updateDataForm(data) {
  return request({
    url: '/disease/edit_disease',
    method: 'post',
    data
  })
}

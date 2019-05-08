import request from '@/utils/request'

export function glistDrug(query) {
  return request({
    url: '/drug/list_drug',
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

export function gallDrug(secondary_name) {
  return request({
    url: '/drug/all_drug',
    method: 'get',
    params: { secondary_name }
  })
}

export function glistKnowlege(primary_name, knowlege_name) {
  return request({
    url: '/product/list_knowlege',
    method: 'get',
    params: { primary_name, knowlege_name }
  })
}

export function paddDrug(results) {
  return request({
    url: '/drug/add_drug',
    method: 'post',
    params: { results }
  })
}

export function peditDrug(results) {
  return request({
    url: '/drug/edit_drug',
    method: 'post',
    params: { results }
  })
}


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

export function gallDiseasIndicateClass(secondary_name) {
  return request({
    url: '/disease/all_disease_indicate_class',
    method: 'get',
    params: { secondary_name }
  })
}

export function paddDiseaseIndicateClass(results) {
  return request({
    url: '/disease/add_disease_indicate_class',
    method: 'post',
    params: { results }
  })
}

export function peditDiseaseIndicateClass(results) {
  return request({
    url: '/disease/edit_disease_indicate_class',
    method: 'post',
    params: { results }
  })
}

export function gdeleteDiseaseIndicateClass(id) {
  return request({
    url: '/disease/delete_disease_indicate_class',
    method: 'get',
    params: id
  })
}

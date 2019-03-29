import request from '@/utils/request'

export function glistProduct(query) {
  return request({
    url: '/product/list_product',
    method: 'get',
    params: query
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
    url: '/product/add_product',
    method: 'post',
    data
  })
}

export function updateDataForm(data) {
  return request({
    url: '/product/edit_product',
    method: 'post',
    data
  })
}

export function gdeleteProduct(id) {
  return request({
    url: '/product/delete_product',
    method: 'get',
    params: { id }
  })
}

export function getPrimary(name) {
  return request({
    url: '/disease/all_primary',
    method: 'get',
    params: { name }
  })
}

export function getSecondary(primary_name) {
  return request({
    url: '/disease/all_secondary',
    method: 'get',
    params: { primary_name }
  })
}

export function gallDisease(secondary_name) {
  return request({
    url: '/disease/all_disease',
    method: 'get',
    params: { secondary_name }
  })
}

export function gallPersonality(secondary_name) {
  return request({
    url: '/personal/all_personality',
    method: 'get',
    params: { secondary_name }
  })
}

export function gallDrug(secondary_name) {
  return request({
    url: '/drug/all_drug',
    method: 'get',
    params: { secondary_name }
  })
}

export function glistIndicate(primary_name, secondary_name) {
  return request({
    url: '/product/list_indicate',
    method: 'get',
    params: { primary_name, secondary_name }
  })
}

export function gchangeProductStatus(id, state) {
  return request({
    url: '/product/change_product_status',
    method: 'get',
    params: { id, state }
  })
}

export function getProductName(product_name) {
  return request({
    url: '/product/get_product_name',
    method: 'get',
    params: { product_name }
  })
}

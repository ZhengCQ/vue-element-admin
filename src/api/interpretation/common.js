import request from '@/utils/request'

export function gfindRsName(rsName) {
  return request({
    url: '/query/find_rs_name',
    method: 'get',
    params: { rsName }
  })
}

export function gfindSiteDetail(rs_name) {
  return request({
    url: '/query/rs_site_detail',
    method: 'get',
    params: { rs_name }
  })
}

export function glistKnowlege(primary_name, knowlege_name) {
  return request({
    url: '/product/list_knowlege',
    method: 'get',
    params: { primary_name, knowlege_name }
  })
}

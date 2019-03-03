import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 35

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    timestamp: +Mock.Random.date('T'),
    'product_manager|1': ['罗宏敏', '汤丽慧', '翟晶'],
    'product_class|1': ['OCLT', 'FGDP'],
    'product_name|1': ['叶酸', '酒精', 'APOE', '肥厚性心肌病', '阵发性室上速', '遗传性肿瘤', '遗传性高血脂'],
    'status|1': ['上线', '下线'],
    id: 'FGDP' + '@increment'
  }))
}

export default {
  getList: config => {
    const { product_manager, status, product_name, page = 4, limit = 20, sort } = param2Obj(config.url)
    let mockList = List.filter(item => {
      if (product_manager && item.product_manager !== product_manager) return false
      if (status && item.status !== status) return false
      if (product_name && item.product_name.indexOf(product_name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createProduts: () => ({
    data: 'success'
  }),
  updateProduts: () => ({
    data: 'success'
  })
}

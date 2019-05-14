import Layout from '@/views/layout/Layout'

const knowledgesRouter = {
  path: '/knowledges',
  component: Layout,
  redirect: '/table/index',
  name: 'Knowledges',
  meta: { title: 'knowledges', icon: 'knowledges' },
  children: [
    {
      path: 'drug',
      component: () => import('@/views/knowledges/drug/index'),
      name: 'Drug',
      meta: { title: 'drugs', icon: 'yaowu', noCache: false }
    },
    {
      path: 'disease',
      component: () => import('@/views/knowledges/disease/index'),
      name: 'Disease',
      meta: { title: 'disease', icon: 'jibing', noCache: false }
    },
    {
      path: 'character',
      component: () => import('@/views/knowledges/personal/index'),
      name: 'Character',
      meta: { title: 'personal', icon: 'tezheng', noCache: false }
    },
    {
      path: 'mendelian',
      component: () => import('@/views/svg-icons/index'),
      name: 'Mendelian',
      meta: { title: 'mendelian', icon: 'danjiyinyichuanbing', noCache: false }
    },
    {
      path: 'products',
      component: () => import('@/views/svg-icons/index'),
      name: 'Productsaterial',
      meta: { title: 'products_material', icon: 'danjiyinyichuanbing', noCache: false }
    }
  ]
}

export default knowledgesRouter

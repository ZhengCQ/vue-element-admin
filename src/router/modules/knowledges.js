import Layout from '@/views/layout/Layout'

const knowledgesRouter = {
  path: '/knowledges',
  component: Layout,
  redirect: '/table/index',
  name: 'Knowledges',
  meta: { title: 'knowledges', icon: 'knowledges' },
  children: [
    {
      path: 'drugs',
      component: () => import('@/views/svg-icons/index'),
      name: 'Drugs',
      meta: { title: 'drugs', icon: 'knowledges', noCache: false }
    },
    {
      path: 'disease',
      component: () => import('@/views/svg-icons/index'),
      name: 'Disease',
      meta: { title: 'disease', icon: 'knowledges', noCache: false }
    },
    {
      path: 'character',
      component: () => import('@/views/svg-icons/index'),
      name: 'Character',
      meta: { title: 'character', icon: 'knowledges', noCache: false }
    },
    {
      path: 'mendelian',
      component: () => import('@/views/svg-icons/index'),
      name: 'Mendelian',
      meta: { title: 'mendelian', icon: 'knowledges', noCache: false }
    }
  ]
}

export default knowledgesRouter

import Layout from '@/views/layout/Layout'

const interpretationRouter = {
  path: '/interpretation',
  component: Layout,
  redirect: '/table/index',
  name: 'interpretation',
  meta: { title: 'interpretation', icon: 'interpretation' },
  children: [
    {
      path: 'drug',
      component: () => import('@/views/svg-icons/index'),
      name: 'DrugIndi',
      meta: { title: 'drugs', icon: 'yaowu', noCache: false }
    },
    {
      path: 'disease',
      component: () => import('@/views/interpretation/disease/index'),
      name: 'DiseaseIndi',
      meta: { title: 'disease', icon: 'jibing', noCache: false }
    },
    {
      path: 'character',
      component: () => import('@/views/svg-icons/index'),
      name: 'CharacterIndi',
      meta: { title: 'character', icon: 'tezheng', noCache: false }
    },
    {
      path: 'mendelian',
      component: () => import('@/views/svg-icons/index'),
      name: 'MendelianIndi',
      meta: { title: 'mendelian', icon: 'danjiyinyichuanbing', noCache: false }
    }
  ]
}

export default interpretationRouter

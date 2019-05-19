import Layout from '@/views/layout/Layout'

const indicateclassRouter = {
  path: '/indicateclass',
  component: Layout,
  redirect: '/table/index',
  name: 'indicateclass',
  meta: { title: 'indicateclass', icon: 'knowledges' },
  children: [
    {
      path: 'drug',
      component: () => import('@/views/svg-icons/index'),
      name: 'DrugClass',
      meta: { title: 'drugs', icon: 'yaowu', noCache: false }
    },
    {
      path: 'disease',
      component: () => import('@/views/indicateclass/disease/index'),
      name: 'DiseaseClass',
      meta: { title: 'disease', icon: 'jibing', noCache: false }
    },
    {
      path: 'personal',
      component: () => import('@/views/svg-icons/index'),
      name: 'CharacterClass',
      meta: { title: 'personal', icon: 'tezheng', noCache: false }
    },
    {
      path: 'mendelian',
      component: () => import('@/views/svg-icons/index'),
      name: 'MendelianClass',
      meta: { title: 'mendelian', icon: 'danjiyinyichuanbing', noCache: false }
    }
  ]
}

export default indicateclassRouter

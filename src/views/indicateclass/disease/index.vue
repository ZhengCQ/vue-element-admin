<template>
  <maincontent
               :fetchList="glistIndicateClass"
               :deleteRecord="gdeleteDisease"
               :getPrimary="gallPrimary"
               :getSecondary="gallSecondary"
               :getIndicate="gallDisease"
               :createDataForm="paddDisease"
               :updateDataForm="peditDisease"
               />
</template>
<script>
import { glistIndicateClass, gdeleteDisease, gallPrimary, gallSecondary, gallDisease, paddDisease, peditDisease } from '@/api/indicateclass/disease'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistIndicateClass,
    gdeleteDisease,
    gallPrimary,
    gallSecondary,
    gallDisease,
    paddDisease,
    peditDisease
  },
  data() {
    return {
      // 主表单需要收集的form数据
      formData: {
        primary_name: '常见疾病',
        secondary_name: '',
        indicate_name: '',
        knowledge_name: '',
        indicate_class: ''
      }
    }
  }
}
</script>

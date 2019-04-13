<template>
  <maincontent
               :fetchList="glistDrug"
               />
</template>
<script>
import { glistDrug } from '@/api/interpretation/drug'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistDrug
  },
  data() {
    return {
      inEditColumns: [{
        label: '位点rs号',
        key: 'rs_name'
      },
      {
        label: 'Gene',
        key: 'gene'
      },
      {
        label: 'EffectAllele',
        key: 'effect_allele'
      },
      {
        label: '次要allele',
        key: 'other_allele'
      },
      {
        label: 'OR值',
        key: 'jb_or'
      },
      {
        label: 'Beta',
        key: 'beta'
      },
      {
        label: 'CI值',
        key: 'CI'
      },
      {
        label: 'Pvalue',
        key: 'p_value'
      },
      {
        label: 'HomRef频率',
        key: 'homeRefFrequency'
      },
      {
        label: 'Het频率',
        key: 'hetFrequency'
      },
      {
        label: 'HomAlt频率',
        key: 'homAltFrequency'
      },
      {
        label: '文献',
        key: 'reference'
      },
      {
        label: '操作',
        key: 'operation'
      }
      ]
    }
  }
}
</script>

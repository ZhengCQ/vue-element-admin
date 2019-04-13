<template>
  <maincontent
               :fetchList="glistdisease"
               :deleteRecord="gdeleteDisease"
               :getPrimary="gallPrimary"
               :getSecondary="gallSecondary"
               :getDisease="gallDisease"
               :glistKnowlege="glistKnowlege"
               :createDataForm="paddDisease"
               :updateDataForm="peditDisease"
               :inEditColumns="inEditColumns"
               :subConfig="subElConfig"
               :formData="formData"
               :siteFormInfo="siteFormInfo"
               :siteConfig="siteConfig"
               />
</template>
<script>
import { glistdisease, gdeleteDisease, gallPrimary, gallSecondary, gallDisease, glistKnowlege, paddDisease, peditDisease } from '@/api/interpretation/disease'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistdisease,
    gdeleteDisease,
    gallPrimary,
    gallSecondary,
    gallDisease,
    glistKnowlege,
    paddDisease,
    peditDisease
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
        key: 'reference',
        width: '460px'
      },
      {
        label: '操作',
        key: 'operation'
      }
      ],
      // 主表单需要收集的form数据
      formData: {
        primary_name: '常见疾病',
        secondary_name: '',
        indicate_name: '',
        knowledge_name: ''
      },
      // 主表单动态表单的配置文件
      subElConfig: {
        fieldsConfig: [
          {
            name: 'primary_name',
            label: '一级分类',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'getPrimary'
          },
          {
            name: 'secondary_name',
            label: '二级分类',
            placeholder: '请输入二级分类',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'getSecondary'
          },
          {
            name: 'indicate_name',
            label: '指标名称',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'querySearchIndi',
            trigerFocus: false
          },
          {
            name: 'knowledge_name',
            label: '素材选择',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'getKnowledge'
          },
          {
            name: 'knowledge_name',
            label: '素材选择',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'getKnowledge'
          }
        ]
      },
      siteFormInfo: {
        rs_name: '',
        gene: '',
        effect_allele: '',
        other_allele: '',
        jb_or: '',
        beta: '',
        homeRefFrequency: '',
        hetFrequency: '',
        homAltFrequency: '',
        CI: '',
        p_value: ''
      },
      siteConfig: {
        fieldsConfig: [
          {
            name: 'rs_name',
            label: '位点编号',
            fieldType: 'autoComplete',
            cols: 12,
            placeholder: '请选择或输入rs号',
            querySearch: 'gfindRsName'
          },
          {
            name: 'gene',
            label: '基因名称',
            fieldType: 'TextInput',
            cols: 12
          },
          {
            name: 'effect_allele',
            label: '主效碱基',
            fieldType: 'SelectList',
            options: [
              { label: 'A', value: 'A' },
              { label: 'T', value: 'T' },
              { label: 'C', value: 'C' },
              { label: 'G', value: 'G' }
            ],
            cols: 12
          },
          {
            name: 'other_allele',
            label: '次要碱基',
            fieldType: 'SelectList',
            options: [
              { label: 'A', value: 'A' },
              { label: 'T', value: 'T' },
              { label: 'C', value: 'C' },
              { label: 'G', value: 'G' }
            ],
            cols: 12
          },
          {
            name: 'jb_or',
            label: 'OR值',
            fieldType: 'TextInput',
            cols: 8
          },
          {
            name: 'beta',
            label: 'Beta值',
            fieldType: 'TextInput',
            cols: 8
          },
          {
            name: 'CI',
            label: 'CI值',
            fieldType: 'TextInput',
            cols: 8
          },
          {
            name: 'p_value',
            label: 'p_value',
            fieldType: 'TextInput',
            cols: 8
          },
          {
            name: 'homeRefFrequency',
            label: 'homRef频率',
            fieldType: 'TextInput',
            cols: 8
          },
          {
            name: 'hetFrequency',
            label: 'het频率',
            fieldType: 'TextInput',
            cols: 8
          },
          {
            name: 'homAltFrequency',
            label: 'homAlt频率',
            fieldType: 'TextInput',
            cols: 8
          }
        ]
      }
    }
  }
}
</script>

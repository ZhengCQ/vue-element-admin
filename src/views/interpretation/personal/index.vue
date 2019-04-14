<template>
  <maincontent
               :fetchList="glistAllPsersonal"
               :deleteRecord="gdeleteIndicate"
               :getPrimary="gallPrimary"
               :getSecondary="gallSecondary"
               :getIndicate="gallPersonality"
               :inEditColumns="inEditColumns"
               :subConfig="subElConfig"
               :formData="formData"
               :siteFormInfo="siteFormInfo"
               :siteConfig="siteConfig"
               />
</template>
<script>
// 缺少新增、编辑表单及罗列知识库
import { glistAllPsersonal, gdeleteIndicate, gallPrimary, gallSecondary, gallPersonality } from '@/api/interpretation/personal'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistAllPsersonal,
    gdeleteIndicate,
    gallPrimary,
    gallSecondary,
    gallPersonality
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
        label: 'Allele1',
        key: 'allele1'
      },
      {
        label: 'Allele2',
        key: 'allele2'
      },
      {
        label: 'Effect',
        key: 'effect'
      },
      {
        label: 'Mark',
        key: 'mark'
      },
      {
        label: '基因型频率',
        key: 'Freq'
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
        primary_name: '个性特质',
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
            prop: 'name',
            placeholder: '请输入二级分类',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'getSecondary'
          },
          {
            name: 'indicate_name',
            label: '指标名称',
            prop: 'name',
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
          }
        ]
      },
      siteFormInfo: {
        rs_name: '',
        gene: '',
        allele1: '',
        allele2: '',
        effect: '',
        mark: '',
        Freq: ''
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
            prop: 'name',
            fieldType: 'TextInput',
            cols: 12
          },
          {
            name: 'allele1',
            label: '碱基1',
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
            name: 'allele2',
            label: '碱基2',
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
            name: 'effect',
            label: 'effect',
            placeholder: '基因型的影响，如较强、较弱等',
            fieldType: 'TextInput',
            cols: 12
          },
          {
            name: 'mark',
            label: 'mark',
            placeholder: '基因型对应分数, 如5',
            fieldType: 'TextInput',
            cols: 12
          },
          {
            name: 'Freq',
            label: '基因型频率',
            placeholder: '基因型频率,0~1',
            fieldType: 'TextInput',
            cols: 12
          }
        ]
      }
    }
  }
}
</script>

<template>
  <maincontent
               :fetchList="glistDrug"
               :getPrimary="gallPrimary"
               :getSecondary="gallSecondary"
               :getIndicate="gallDrug"
               :glistKnowlege="glistKnowlege"
               :createDataForm="paddDrug"
               :updateDataForm="peditDrug"
               :siteEditColumns="siteEditColumns"
               :subConfig="subElConfig"
               :formData="formData"
               :siteFormInfo="siteFormInfo"
               :siteConfig="siteConfig"
               />
</template>
<script>
// 新增 /drug/add_drug
// 编辑 /drug/edit_drug
// 罗列知识库 /drug/list_knowlege
import { glistDrug, gallPrimary, gallSecondary, gallDrug, glistKnowlege, paddDrug, peditDrug } from '@/api/interpretation/drug'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistDrug,
    gallPrimary,
    gallSecondary,
    gallDrug,
    glistKnowlege,
    paddDrug,
    peditDrug
  },
  data() {
    return {
      siteEditColumns: [{
        label: '位点rs号',
        key: 'rs_name',
        width: '100px'
      },
      {
        label: 'Gene',
        key: 'gene'
      },
      {
        label: 'phenotype',
        key: 'phenotype'
      },
      {
        label: 'priority',
        key: 'priority'
      },
      {
        label: 'medication_tips',
        key: 'medication_tips'
      },
      {
        label: 'medication_advice',
        key: 'medication_advice',
        width: '200px'
      },
      {
        label: 'interpretation_label',
        key: 'interpretation_label'
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
        primary_name: '药物代谢',
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
        phenotype: '',
        priority: '',
        medication_tips: '',
        interpretation_label: '',
        medication_advice: ''
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
            name: 'phenotype',
            label: 'phenotype',
            fieldType: 'SelectList',
            options: [
              { label: '野生型', value: '野生型' },
              { label: '杂合突变型', value: '突变型，杂合' },
              { label: '纯合突变型', value: '突变型，纯合' }
            ],
            cols: 12
          },
          {
            name: 'priority',
            label: 'priority',
            fieldType: 'SelectList',
            options: [
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' }
            ],
            cols: 12
          },
          {
            name: 'medication_tips',
            label: 'medication_tips',
            fieldType: 'SelectList',
            options: [
              { label: '常规使用', value: '常规使用' },
              { label: '降低疗效', value: '降低疗效' },
              { label: '提高疗效', value: '提高疗效' },
              { label: '谨慎使用', value: '谨慎使用' }
            ],
            cols: 12
          },
          {
            name: 'interpretation_label',
            label: 'interpretation_label',
            fieldType: 'SelectList',
            options: [
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' }
            ],
            cols: 12
          },
          {
            name: 'medication_advice',
            label: 'medication_advice',
            placeholder: '用药建议',
            fieldType: 'multiTextInput',
            cols: 16,
            autosize: { minRows: 4, maxRows: 8 }
          }
        ]
      }
    }
  }
}
</script>

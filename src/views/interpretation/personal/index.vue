<template>
  <maincontent
               :fetchList="glistAllPsersonal"
               :deleteRecord="gdeleteIndicate"
               :getPrimary="gallPrimary"
               :getSecondary="gallSecondary"
               :getIndicate="gallPersonality"
               :createDataForm="paddPersonInterpretation"
               :updateDataForm="peditPersonInterpretation"
               :subConfig="subElConfig"
               :conclusionFormInfo="conclusionFormInfo"
               :conclusionConfig="conclusionConfig"
               :conclustionColumns="conclustionColumns"
               :formData="formData"
               :siteFormInfo="siteFormInfo"
               :siteEditColumns="siteEditColumns"
               :siteConfig="siteConfig"
               />
</template>
<script>
// 缺少新增、编辑表单及罗列知识库
// /personal/add_person_interpretation
// /personal/edit_person_interpretation
// /personal/indicate_2_knowlege
import { glistAllPsersonal, gdeleteIndicate, gallPrimary, gallSecondary, gallPersonality, paddPersonInterpretation, peditPersonInterpretation } from '@/api/interpretation/personal'
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
    gallPersonality,
    paddPersonInterpretation,
    peditPersonInterpretation
  },
  data() {
    return {
      // 主表单需要收集的form数据
      formData: {
        primary_name: '个性特质',
        secondary_name: '',
        indicate_name: '',
        indicate_class: '',
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
            name: 'indicate_class',
            label: '指标类',
            prop: 'indicate_class',
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
      // 结论表单数据初始化
      conclusionFormInfo: {
        conclusion: '',
        explanation: '',
        evaluation_indicator: '',
        interpretation_details: '',
        suggest: ''
      },
      // 结论表单动态生成配置文件
      conclusionConfig: {
        fieldsConfig: [
          {
            name: 'conclusion',
            label: '分类结论与评估',
            placeholder: '风险等级和评估指标',
            fieldType: 'CasCader',
            options: [
              {
                label: '三级', value: '三级分类', children: [
                  { label: '低风险', value: '低风险', children: [
                    { label: '<0.8', value: '<0.8' },
                    { label: '<0.9', value: '<0.9' }]
                  },
                  { label: '一般风险', value: '一般风险', children: [
                    { label: '0.8<=x<1.1', value: '>=0.8&&<1.1' },
                    { label: '0.9<=x<1.1', value: '>=0.9&&<1.1' }]
                  },
                  { label: '高风险', value: '高风险', children: [
                    { label: '>=1.1', value: '>=1.1' },
                    { label: '>=1.4', value: '>=1.4' }]
                  }
                ]
              },
              {
                label: '五级', value: '五级分类', children: [
                  { label: '低风险', value: '低风险', children: [
                    { label: '<0.8', value: '<0.8' },
                    { label: '<0.9', value: '<0.9' }]
                  },
                  { label: '一般风险', value: '一般风险', children: [
                    { label: '0.8<=x<1.1', value: '>=0.8&&<1.1' },
                    { label: '0.9<=x<1.1', value: '>=0.9&&<1.1' }]
                  },
                  { label: '稍高风险', value: '稍高风险', children: [
                    { label: '1.1<=x<1.4', value: '>=1.1&&<1.4' }]
                  },
                  { label: '高风险', value: '高风险', children: [
                    { label: '>=1.1', value: '>=1.1' },
                    { label: '>=1.4', value: '>=1.4' }]
                  },
                  { label: '极高风险', value: '极高风险', children: [
                    { label: '>=2', value: '>=2' }]
                  }
                ]
              }
            ],
            cols: 20
          }
        ]
      },
      // 位点可编辑表格的动态配置
      conclustionColumns: [{
        label: '结论',
        key: 'conclusion'
      },
      {
        label: '结论说明',
        key: 'explanation',
        width: '200px'
      },
      {
        label: '评估指标',
        key: 'evaluation_indicator'
      },
      {
        label: '解读详情',
        key: 'interpretation_details',
        width: '250px'
      },
      {
        label: '建议对策',
        key: 'suggest',
        width: '300px'
      }],
      // 位点表单数据初始化
      siteFormInfo: {
        rs_name: '',
        gene: '',
        ref: '',
        alt: '',
        genotype: '',
        effect: '',
        mark: '',
        Freq: '',
        edit: false
      },
      // 位点表单动态配置
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
            name: 'ref',
            label: '参考碱基',
            fieldType: 'TextInput',
            cols: 12
          },
          {
            name: 'alt',
            label: '突变碱基',
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
            name: 'genotype',
            label: '基因型',
            fieldType: 'SelectList',
            options: [
              { label: 'ref_hom', value: 'ref_hom' },
              { label: 'alt_hom', value: 'alt_hom' },
              { label: 'alt_ref', value: 'alt_ref' }
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
      },
      // 位点可编辑表格配置
      siteEditColumns: [{
        label: '位点rs号',
        key: 'rs_name'
      },
      {
        label: '基因名称',
        key: 'gene'
      },
      {
        label: '参考碱基',
        key: 'ref'
      },
      {
        label: '突变碱基',
        key: 'alt'
      },
      {
        label: '基因型',
        key: 'genotype'
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
      ]
    }
  }
}
</script>

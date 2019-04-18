<template>
  <maincontent
               :fetchList="glistdisease"
               :deleteRecord="gdeleteDisease"
               :getPrimary="gallPrimary"
               :getSecondary="gallSecondary"
               :getIndicate="gallDisease"
               :glistKnowlege="glistKnowlege"
               :createDataForm="paddDisease"
               :updateDataForm="peditDisease"
               :siteEditColumns="siteEditColumns"
               :conclustionColumns="conclustionColumns"
               :subConfig="subElConfig"
               :formData="formData"
               :siteFormInfo="siteFormInfo"
               :siteConfig="siteConfig"
               :rules="rules"
               :conclusionFormInfo="conclusionFormInfo"
               :conclusionConfig="conclusionConfig"
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
      // 可编辑表格的动态配置
      siteEditColumns: [{
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
            prop: 'secondary_name',
            placeholder: '请输入二级分类',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'getSecondary'
          },
          {
            name: 'indicate_name',
            label: '指标名称',
            prop: 'indicate_name',
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
      conclustionColumns: [{
        label: '结论',
        key: 'conclusion'
      },
      {
        label: '评估指标',
        key: 'assesement'
      },
      {
        label: '解读详情',
        key: 'detail',
        width: '250px'
      },
      {
        label: '建议对策',
        key: 'suggtion',
        width: '300px'
      }],
      // 结论表单数据初始化
      conclusionFormInfo: {
        primary_name: ''
      },
      // 结论表单动态生成配置文件
      conclusionConfig: {
        fieldsConfig: [
          {
            name: 'conclusion',
            label: '结论',
            placeholder: '风险等级',
            fieldType: 'TextInput',
            cols: 10
          },
          {
            name: 'assesement',
            label: '评估指标',
            placeholder: '结论对应的OR范围区间',
            fieldType: 'TextInput',
            cols: 12
          }
        ]
      },
      // 位点表单数据初始化
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
        p_value: '',
        reference: ''
      },
      // 位点表单动态配置
      siteConfig: {
        fieldsConfig: [
          {
            name: 'rs_name',
            label: '位点编号',
            prop: 'rs_name',
            fieldType: 'autoComplete', // 表单类型
            cols: 12, // 占据的空间
            placeholder: '请选择或输入rs号', // 表格里面显示提示什么
            querySearch: 'gfindRsName' // 这个是函数的识别字符，根据这个字符再选择函数
          },
          {
            name: 'gene',
            label: '基因名称',
            placeholder: '官方Symbol',
            fieldType: 'TextInput',
            cols: 12
          },
          {
            name: 'effect_allele',
            prop: 'effect_allele',
            label: '主效碱基',
            placeholder: '请选择碱基',
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
            prop: 'other_allele',
            placeholder: '请选择碱基',
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
            placeholder: '整数或小数',
            prop: 'jb_or',
            fieldType: 'NumInput',
            cols: 8
          },
          {
            name: 'beta',
            label: 'Beta值',
            placeholder: '整数或小数',
            fieldType: 'NumInput',
            cols: 8
          },
          {
            name: 'CI',
            label: 'CI值',
            placeholder: '整数或小数',
            fieldType: 'NumInput',
            cols: 8
          },
          {
            name: 'p_value',
            label: 'p_value',
            placeholder: '小数0~1',
            fieldType: 'NumInput',
            cols: 8
          },
          {
            name: 'homeRefFrequency',
            label: 'homRef频率',
            prop: 'homeRefFrequency',
            placeholder: '小数0~1',
            fieldType: 'NumInput',
            cols: 8
          },
          {
            name: 'hetFrequency',
            label: 'het频率',
            prop: 'hetFrequency',
            placeholder: '小数0~1',
            fieldType: 'NumInput',
            cols: 8
          },
          {
            name: 'homAltFrequency',
            label: 'homAlt频率',
            placeholder: '小数0~1',
            prop: 'homAltFrequency',
            fieldType: 'NumInput',
            cols: 8
          }
        ]
      },
      // 表单验证规则
      rules: {
        primary_name: [{ message: '必填项', required: 'true' }],
        indicate_name: [{ message: '必填项', required: 'true' }],
        secondary_name: [{ message: '必填项', required: 'true' }],
        rs_name: [
          { message: '必填项', required: 'true' },
          { pattern: /^rs\d{1,10}$/, message: 'rs +  1 到 10 个数字', trigger: 'blur' }
        ],
        effect_allele: [{ message: '请选择一个碱基', required: 'true', trigger: 'blur' }],
        other_allele: [{ message: '请选择一个碱基', required: 'true', trigger: 'blur' }],
        homeRefFrequency: [
          { message: '值为小数，范围0~1', required: 'true', type: 'number', trigger: 'blur' },
          { pattern: /0 | ^0\.\d{1,10}$/, message: '请输入0-1之间的小数', trigger: 'blur' }
        ],
        hetFrequency: [
          { message: '值为小数，范围0~1', required: 'true', type: 'number', trigger: 'blur' },
          { pattern: /0 | ^0\.\d{1,10}$/, message: '请输入0-1之间的小数', trigger: 'blur' }
        ],
        homAltFrequency: [
          { message: '值为小数，范围0~1', required: 'true', type: 'number', trigger: 'blur' },
          { pattern: /0 | ^0\.\d{1,10}$/, message: '请输入0-1之间的小数', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

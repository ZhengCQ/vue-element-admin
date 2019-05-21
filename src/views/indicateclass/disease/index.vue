<template>
  <maincontent
               :tableConfig="tableConfig"
               :fetchList="glistIndicateClass"
               :deleteRecord="gdeleteDiseaseIndicateClass"
               :getPrimary="gallPrimary"
               :getSecondary="gallSecondary"
               :getIndicate="gallDiseasIndicateClass"
               :createDataForm="paddDiseaseIndicateClass"
               :updateDataForm="peditDiseaseIndicateClass"
               :formData="formData"
               :subConfig="subElConfig"
               />
</template>
<script>
import { glistIndicateClass, gdeleteDiseaseIndicateClass, gallPrimary, gallSecondary, gallDiseasIndicateClass, paddDiseaseIndicateClass, peditDiseaseIndicateClass } from '@/api/indicateclass/disease'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistIndicateClass,
    gdeleteDiseaseIndicateClass,
    gallPrimary,
    gallSecondary,
    gallDiseasIndicateClass,
    paddDiseaseIndicateClass,
    peditDiseaseIndicateClass
  },
  data() {
    return {
      tableConfig: [
        {
          name: 'primary_name',
          label: '一级分类',
          prop: 'secondary_name'
        },
        {
          name: 'secondary_name',
          label: '二级分类',
          prop: 'secondary_name'
        },
        {
          name: 'indicate_class',
          label: '指标类',
          prop: 'indicate_class'
        },
        {
          name: 'male_incidence',
          label: '男性发病率',
          prop: 'male_incidence'
        },
        {
          name: 'female_incidence',
          label: '女性发病率',
          prop: 'female_incidence'
        },
        {
          name: 'disease_profile',
          prop: 'disease_profile',
          label: '疾病概述',
          type: 'expand'
        },
        {
          name: 'risk_factor',
          prop: 'risk_factor',
          label: '风险因素',
          type: 'expand'
        },
        {
          name: 'early_symptoms',
          prop: 'early_symptoms',
          label: '早期症状',
          type: 'expand'
        },
        {
          name: 'privention_advice',
          prop: 'privention_advice',
          label: '预防建议',
          type: 'expand'
        },
        {
          name: 'medical_examination_instructions',
          prop: 'medical_examination_instructions',
          label: '体检须知',
          type: 'expand'
        }],
      // 主表单需要收集的form数据
      formData: {
        primary_name: '常见疾病',
        secondary_name: '',
        indicate_name: '',
        knowledge_name: '',
        indicate_class: '',
        male_incidence: '',
        female_incidence: '',
        disease_profile: '',
        risk_factor: '',
        early_symptoms: '',
        privention_advice: '',
        medical_examination_instructions: ''
      },
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
            name: 'indicate_class',
            label: '指标类',
            prop: 'indicate_class',
            fieldType: 'autoComplete',
            cols: 16,
            querySearch: 'querySearchIndi',
            trigerFocus: false
          },
          {
            name: 'male_incidence',
            label: '男性发病率',
            prop: 'male_incidence',
            placeholder: '小数0~1',
            fieldType: 'NumInput',
            cols: 16
          },
          {
            name: 'female_incidence',
            label: '女性发病率',
            prop: 'female_incidence',
            placeholder: '小数0~1',
            fieldType: 'NumInput',
            cols: 16
          },
          {
            name: 'disease_profile',
            prop: 'disease_profile',
            label: '疾病概述',
            placeholder: '疾病概述',
            fieldType: 'multiTextInput'
          },
          {
            name: 'risk_factor',
            prop: 'risk_factor',
            label: '风险因素',
            placeholder: '风险因素',
            fieldType: 'multiTextInput'
          },
          {
            name: 'early_symptoms',
            prop: 'early_symptoms',
            label: '早期症状',
            placeholder: '早期症状',
            fieldType: 'multiTextInput'
          },
          {
            name: 'privention_advice',
            prop: 'privention_advice',
            label: '预防建议',
            placeholder: '预防建议',
            fieldType: 'multiTextInput'
          },
          {
            name: 'medical_examination_instructions',
            prop: 'medical_examination_instructions',
            label: '体检须知',
            placeholder: '体检须知',
            fieldType: 'multiTextInput'
          }
        ]
      }
    }
  }
}
</script>

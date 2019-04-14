<template>
  <el-form :model="siteForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;" v-if="showValueForm">
    <!--SNP位点 开始-->
    <el-form-item :label="$t('table.snp_name')" prop="name">
      <el-autocomplete class="input" v-model="siteForm.rs_name" :fetch-suggestions="querySearchRs" placeholder="新增位点"></el-autocomplete>
    </el-form-item>
    <!--SNP位点 结束-->
    <!--基因 开始-->
    <el-form-item :label="$t('table.gene')" prop="name">
      <el-input placeholder="请输入内容" v-model="siteForm.gene" clearable> </el-input>
    </el-form-item>
    <!--基因 结束-->
    <!--碱基 allele 开始-->
    <el-form-item :label="$t('table.effect_allele')" prop="effect_allele">
      <el-select v-model="siteForm.effect_allele" class="filter-item" placeholder="Please select">
        <el-option v-for="item in basesTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('table.other_allele')" prop="other_allele">
      <el-select v-model="siteForm.other_allele" class="filter-item" placeholder="Please select">
        <el-option v-for="item in basesTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <!--碱基 allele 结束-->
    <!--OR值 开始-->
    <el-form-item :label="$t('table.jb_or')" prop="jb_or">
      <el-input placeholder="请输入OR值" v-model="siteForm.jb_or" clearable> </el-input>
    </el-form-item>
    <!--OR值 结束-->
    <!--碱基频率 开始-->
    <el-form-item :label="$t('table.homeRefFrequency')" prop="homeRefFrequency">
      <el-input placeholder="请输入HOM Ref 频率值" v-model="siteForm.homeRefFrequency" clearable> </el-input>
    </el-form-item>
    <el-form-item :label="$t('table.hetFrequency')" prop="hetFrequency">
      <el-input placeholder="请输入Het Freq值" v-model="siteForm.hetFrequency" clearable> </el-input>
    </el-form-item>
    <el-form-item :label="$t('table.homAltFrequency')" prop="homAltFrequency">
      <el-input placeholder="请输入Hom Alt Freq值" v-model="siteForm.homAltFrequency" clearable> </el-input>
    </el-form-item>
    <!--碱基频率 结束-->
    <!--参考文献 开始-->
    <el-form-item :label="$t('table.reference')" prop="reference">
      <el-input placeholder="请输入参考文献" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="siteForm.reference" clearable> </el-input>
    </el-form-item>
    <!--参考文献 结束-->
    <slot></slot>
  </el-form>
</template>
<script type="text/javascript">
import { gfindRsName } from '@/api/interpretation'
import transQueryList from '@/utils/utils'

export default {
  data() {
    return {
      basesTypeOptions: ['A', 'T', 'C', 'G'],
      rules: this.InterpMainApp.rules
    }
  },
  props: {
    siteForm: {
      type: Object
    },
    showValueForm: {
      type: Boolean
    }
  },
  methods: {
    async querySearchRs(queryString, callback) {
      const name = this.siteForm.rs_name
      var itemData = await gfindRsName(name)
      itemData = itemData.data.rs_name
      const list = transQueryList(queryString, itemData)
      callback(list)
    }
  }
}
</script>

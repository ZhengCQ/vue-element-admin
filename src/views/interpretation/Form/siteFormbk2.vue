<template>
  <div>
  <el-form :inline="true" :model="siteForm2" :rules="rules" label-position="left"  style="width: 600px; margin-left:50px;" v-if="showValueForm">
    <el-row>
    <form-generator
                   :config="config"
                   v-model="FormInfo"
                   :rules="rules"/>
    </el-row>
   </el-form>
    <!--参考文献 开始-->
    <el-form :model="siteForm2" :rules="rules" label-position="left"  style="width: 600px; margin-left:50px;" v-if="showValueForm">
    <el-form-item :label="$t('table.reference')" prop="reference">
      <el-input placeholder="请输入参考文献" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.reference" clearable> </el-input>
    </el-form-item>
    <!--参考文献 结束-->
    <slot></slot>
  </el-form>
</div>
</template>
<script type="text/javascript">
import { gfindRsName } from '@/api/interpretation'
import transQueryList from '@/utils/utils'
import FormGenerator from '@/components/Form/FormGenerator'

export default {
  name: 'SiteForm',
  components: { FormGenerator },
  inject: ['InterpMainApp'], // 从Main.vue中获取数据
  data() {
    return {
      config: this.InterpMainApp.siteConfig,
      siteForm2: this.FormInfo,
      rules: this.InterpMainApp.rules
    }
  },
  props: {
    showValueForm: {
      type: Boolean
    },
    FormInfo: {
      type: Object
    }
  },
  watch: {
    FormInfo(val) {
      this.siteForm2 = val
    }
  },
  created() {
    this.querySearchType()
  },
  methods: {
    // 位点搜寻
    async querySearchRs(queryString, callback) {
      const name = this.siteForm2.rs_name
      var itemData = await gfindRsName(name)
      console.log(itemData)
      itemData = itemData.data.rs_name
      const list = transQueryList(queryString, itemData)
      callback(list)
    },
    querySearchType() { // 函数一时没有找到方法直接转递，采用字符传递方式，再用方法替代。
      this.config.fieldsConfig.forEach((item, index) => {
        if (item.querySearch === 'gfindRsName') {
          item.querySearch = this.querySearchRs
        }
      })
    }
  }
}
</script>

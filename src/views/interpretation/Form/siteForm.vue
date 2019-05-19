<template>
  <div>
    <el-form :inline="true" :model="FormInfo" :rules="rules" label-position="left" style="width: 600px;margin-left:50px;" v-if="showForm">
      <el-row>
        <form-generator
                ref="formgenerator"
                :config="config"
                v-model="FormInfo"
                :rules="rules"
        />
      </el-row>
    </el-form>
  <el-form style="width: 600px;margin-left:50px;" v-if="showForm">
    <el-form-item :label="$t('table.reference')" prop="reference">
      <el-input placeholder="请输入参考文献" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.reference" clearable> </el-input>
    </el-form-item>
    <!--参考文献 结束-->
    <slot></slot>
  </el-form>
  </div>
</template>
<script type="text/javascript">
import { gfindRsName, gfindSiteDetail } from '@/api/interpretation/common'
import transQueryList from '@/utils/utils'
import FormGenerator from '@/components/Form/FormGenerator'

export default {
  name: 'SiteForm',
  components: { FormGenerator },
  inject: ['InterpMainApp'], // 从Main.vue中获取数据
  data() {
    return {
      config: this.InterpMainApp.siteConfig,
      FormInfo: this.InterpMainApp.siteFormInfo,
      rules: this.InterpMainApp.rules
    }
  },
  props: {
    showForm: {
      type: Boolean
    }
  },
  created() {
    this.querySearchType()
  },
  computed: {
    rs_name() {
      return this.FormInfo.rs_name
    }
  },
  watch: {
    rs_name(newValue, oldValue) {
      // 值变化并有值时候，调用查询rs详情
      if (newValue) {
        this.queryRsDetail(newValue)
      }
    }
  },
  methods: {
    // 位点搜寻
    async querySearchRs(queryString, callback) {
      const name = this.FormInfo.rs_name
      var itemData = await gfindRsName(name)
      itemData = itemData.data.rs_name
      const list = transQueryList(queryString, itemData)
      callback(list)
    },
    async queryRsDetail(rs_name) {
      var itemData = await gfindSiteDetail(rs_name)
      var altArray = []

      console.log(itemData.data.result)
      this.FormInfo.gene = itemData.data.result[0].gene
      this.FormInfo.ref = itemData.data.result[0].ref
      // alt 有多个，当alt不为空的时候，将alt存为数组，输出到alt的options共选择
      itemData.data.result.forEach(item => {
        if (item.alt) {
          altArray.push(
            { label: item.alt, value: item.alt },
          )
        }
      })
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

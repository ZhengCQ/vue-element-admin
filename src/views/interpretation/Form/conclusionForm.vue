<template>
  <div>
    <el-form :inline="true" :model="FormInfo" :rules="rules" label-position="left" style="width: 600px;margin-left:50px;" v-if="showForm">
      <el-row>
        <form-generator
                :config="config"
                v-model="FormInfo"
                :rules="rules"
        />
      </el-row>
    </el-form>
  <el-form style="width: 600px;margin-left:50px;" v-if="showForm">
    <el-form-item :label="$t('table.explanation')" prop="explanation">
      <el-input placeholder="结论说明和概况" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.explanation" clearable> </el-input>
    </el-form-item>
    <el-form-item :label="$t('table.interpretation')" prop="interpretation">
      <el-input placeholder="结论的详细解读及建议概述" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.interpretation_details" clearable> </el-input>
    </el-form-item>
    <el-form-item :label="$t('table.suggestion')" prop="suggestion">
      <el-input placeholder="详细的建议对策" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.suggest" clearable> </el-input>
    </el-form-item>
     <slot></slot>
  </el-form>
  </div>
</template>
<script type="text/javascript">
import FormGenerator from '@/components/Form/FormGenerator'
export default {
  name: 'ConclusionForm',
  components: { FormGenerator },
  inject: ['InterpMainApp'], // 从Main.vue中获取数据
  data() {
    return {
      config: this.InterpMainApp.conclusionConfig,
      FormInfo: this.InterpMainApp.conclusionFormInfo,
      rules: this.InterpMainApp.rules
    }
  },
  props: {
    showForm: {
      type: Boolean
    }
  }
}
</script>

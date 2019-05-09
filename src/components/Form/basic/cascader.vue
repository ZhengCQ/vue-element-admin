<template>
  <el-form-item :label="label" :prop="prop">
    <el-cascader
         v-model="currentValue"
         @input="onInputEvent"
         :placeholder="placeholder"
         :options="options"
         change-on-select>
    </el-cascader>
  </el-form-item>
</template>
<script>
import formMixins from '@/mixins/form-model'
export default {
  name: 'CasCader',
  props: ['placeholder', 'options', 'prop', 'label'],
  mixins: [formMixins],
  data() {
    return {
      currentValue: []
    }
  },
  watch: {
    value(val) {
      // console.log(val)
    }
  }
}
</script>

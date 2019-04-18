<template>
  <el-form-item :label="label" :prop="prop">
    <el-input
             type="number"
             :name="name"
             v-model.number="currentValue"
             @input="onInputEvent"
             :placeholder="placeholder">
    </el-input>
  </el-form-item>
</template>
<script>
import formMixins from '@/mixins/form-model'
export default {
  name: 'NumInput',
  props: ['placeholder', 'label', 'prop', 'name', 'value'],
  mixins: [formMixins],
  data() {
    return {
      currentValue: this.value
    }
  }
}
</script>
<style scoped>
</style>

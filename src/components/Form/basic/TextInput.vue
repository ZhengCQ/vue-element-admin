<template>
  <el-form-item :label="label" :prop="prop">
    <el-input
             type="text"
             :name="name"
             v-model="currentValue"
             @input="onInputEvent"
             :placeholder="placeholder">
    </el-input>
  </el-form-item>
</template>
<script>
import formMixins from '@/mixins/form-model'
export default {
  name: 'TextInput',
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

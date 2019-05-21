<template>
  <el-form-item :label="label" :prop="prop" >
    <el-input
             type="textarea"
             :name="name"
             v-model="currentValue"
             @input="onInputEvent"
             :autosize="autosize"
             :placeholder="placeholder">
    </el-input>
  </el-form-item>
</template>
<script>
import formMixins from '@/mixins/form-model'
export default {
  name: 'MultiTextInput',
  props: ['placeholder', 'label', 'prop', 'name', 'value', 'autosize'],
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

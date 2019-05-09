<template>
  <div>
    <el-col :span="field.cols" v-for="(field, index) in config.fieldsConfig" v-bind:key="index">
      <component
                  :key="index"
                  :is="field.fieldType"
                  :label="field.label"
                  :prop="field.prop"
                  :value="formData[field.name]"
                  :multiple="field.multiple"
                  @input="updateForm"
                  v-bind="field"
                  :options="field.options"
                  :ref="field.name"
                  :trigerFocus="field.trigerFocus"
                  :autosize="field.autosize"
      >
      </component>
    </el-col>
  </div>
</template>
<script>
import autoComplete from './basic/autoComplete'
import TextInput from './basic/TextInput'
import NumInput from './basic/NumInput'
import SelectList from './basic/SelectList'
import multiTextInput from './basic/multiTextInput'
import CasCader from './basic/cascader.vue'
export default {
  name: 'FormGenerator',
  components: { autoComplete, TextInput, SelectList, multiTextInput, NumInput, CasCader },
  props: ['config', 'value'],
  data() {
    return {
      formData: this.value
    }
  },
  watch: {
    value(val) {
      this.formData = val
    }
  },
  methods: {
    updateForm(fieldName, value) {
      this.formData[fieldName] = value
    },
    submit() {
      this.$emit('submit')
    },
    reset() {
      for (var name in this.formData) {
        if (typeof (this.formData) === String) {
          this.formData[name] = ''
        } else {
          this.formData[name] = null
        }
      }
    }
  }
}
</script>

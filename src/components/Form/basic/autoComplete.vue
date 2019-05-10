<template>
  <el-form-item :label="label" :prop="prop">
    <el-autocomplete
                    class="input"
                    v-model="currentValue"
                    :fetch-suggestions="querySearch"
                    :placeholder="placeholder"
                    @input="onInputEvent"
                    :trigger-on-focus="trigerFocus"
    >
    </el-autocomplete>
  </el-form-item>
</template>
<script>
import formMixins from '@/mixins/form-model'
export default {
  name: 'AutoComplete',
  props: ['placeholder', 'label', 'value', 'prop', 'querySearch', 'trigerFocus'],
  data() {
    return {
      currentValue: this.value
    }
  },
  mixins: [formMixins], // 监控value值的变化
  // 该方法可不采用
  methods: {
    async handleSelect(item) {
      // this.$emit('input', this.name, this.currentValue) // this.name来自fieldsConfig中的name表示，代表当前表单的name, 将name 和判定的值传回到上一级，上一级父组件中捕获后更新值@input="updateForm" formData值
    }
  }
}

</script>
<style scoped>
</style>

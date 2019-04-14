<template>
  <el-form-item :label="label" :prop="prop">
    <el-autocomplete
                    class="input"
                    v-model="currentValue"
                    :fetch-suggestions="querySearch"
                    :placeholder="placeholder"
                    @select="handleSelect"
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
  methods: {
    handleSelect(item) {
      this.$emit('input', this.name, this.currentValue) // 将name 和判定的值传回到上一级，上一级捕获后更新formData
    }
  }
}

</script>
<style scoped>
</style>

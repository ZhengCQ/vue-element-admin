export default {
  props: ['name', 'value'],
  data() {
    return {
      currentValue: this.value
    }
  },
  methods: {
    onInputEvent(value) {
      this.$emit('input', this.name, this.currentValue)
    },
    reset() {
      this.currentValue = ''
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    }
  }
}

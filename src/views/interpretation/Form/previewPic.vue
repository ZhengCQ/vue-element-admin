<template>
  <div class="my-picture">
    <el-dialog
:visible="visible"
               @close="close">
      <img
width="100%"
           :src="imgUrl"
           v-if="url">
      <h2 v-else>未获取到图片</h2>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyPicture',

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    url: {
      type: String,
      default: ''
    }
  },

  computed: {
    imgUrl() {
      if (this.url.indexOf('?') === -1) {
        return `${this.url}?imageslim`
      }

      return this.url
    }
  },

  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.my-picture {
  .picture-mini {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .el-dialog__body {
    border-top: none;
  }
}
</style>

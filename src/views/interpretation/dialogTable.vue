<template>
  <!---->
  <el-dialog :title="title" :visible.sync="dialogVisible" @close="onCancel">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column
        v-for="(item, key) in tableKey"
            :key="key"
            :label="item.label"
            :prop="item.key"
            :width="item.width">
         </el-table-column>
    </el-table>
  </el-dialog>
  <!---->
</template>

<script type="text/javascript">
export default {
  name: 'DialogTable',
  data() {
    return {
      dialogVisible: this.dialogTableVisible
    }
  },
  props: ['title', 'dialogTableVisible', 'tableData', 'tableKey'],
  watch: {
    dialogTableVisible(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

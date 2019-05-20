<template>
  <!---->
  <el-dialog :title="title" :visible.sync="dialogVisible" @close="onCancel">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column
                v-for="item in tableKey"
                v-if="item.type === 'img'"
                :key="item.key"
                :label="item.label"
                :width="item.width"
                :align="item.align || 'center'">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark"  placement="top-start" v-if="scope.row[item.alt]">
          <img
               class="table-picture"
               :src="scope.row[item.alt]"
               :alt="`${scope.row.name}`"
               @click="previewLogo(scope.row[item.alt])">
              </el-tooltip>
          <span v-else>无</span>
      </template>
    </el-table-column>

      <el-table-column
            v-else
            :key="item.key"
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

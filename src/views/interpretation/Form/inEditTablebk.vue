<template>
  <el-table  v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column v-for="item in columns" :key="item.key" :label="item.label" :width="item.width" :align="item.align || 'center'">
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.key">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row[item.key]" size="small" />
          </template>
          <span v-else>{{ scope.row[item.key] }}</span>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script type="text/javascript">
export default {
  name: 'IneditTable',
  data() {
    return {
      tableData: this.data,
      listLoading: false
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data(val) {
      this.tableData = val
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      this.tableData = this.tableData.map(v => {
        this.$set(v, 'edit', false)
        return v
      }) // 编辑的全部为false
      console.log(this.tableData)
      this.listLoading = false
    },
    handleSelectionChange(val) {
      console.log(val)
    }
  }
}
</script>

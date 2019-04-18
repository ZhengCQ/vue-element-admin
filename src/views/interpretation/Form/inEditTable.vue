<template>
  <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
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
    <el-table-column label="操作" width="120" align="center">
      <template slot-scope="scope">
        <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">OK</el-button>
        <el-button v-else type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDelRs(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script type="text/javascript">
export default {
  name: 'IneditTable',
  data() {
    return {
      tableData: this.data
    }
  },
  props: ['data', 'columns'],
  watch: {
    data(val) {
      this.tableData = val
    }
  },
  methods: {
    confirmEdit(row) {
      this.tableData.forEach((item) => {
        if (item.id === row.id) { // id相同更新值
          for (var name in row) {
            item[name] = row[name]
          }
          this.$set(item, 'edit', false) // 需要$set这个来更新视窗
          this.$message({
            message: row.gene + '更新成功',
            type: 'success'
          })
        }
      })
    },
    handleEdit(row) {
      this.$set(row, 'edit', true) // 需要$set这个来更新视窗，这个花了一个晚上
    },
    handleDelRs(row) {
      this.tableData.forEach((item, index) => {
        if (item.id === row.id) { // 数据库中ID相同，或者临时ID相同
          this.tableData.splice(index, 1)
        }
      })
    }
  }
}
</script>

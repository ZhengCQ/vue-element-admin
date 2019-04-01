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
  </el-table>
</template>
<script type="text/javascript">
export default {
  name: 'IneditTable',
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
  computed: {
    tableData() {
      if (this.data.length === 0) {
        return []
      } else {
        const tmp = []
        console.log(this.data)
        this.data.forEach((item, index) => {
          tmp.push(item)
        })
        return tmp
      }
    }
  }
}

</script>

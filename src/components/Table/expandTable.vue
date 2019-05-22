<template>
  <el-table v-loading="listLoading" :data="data" border fit highlight-current-row style="width: 100%;">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item
              v-for="item in tableKey"
              v-if="item.type === 'expand'"
              :key = "item.key"
              :label="item.label">
            <span>{{ scope.row[item.name]}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!--el-table-column type="index" label="No." width="70px" align="center" /-->
    <el-table-column
           v-for="item in tableKey"
           show-overflow-tooltip
           :key="item.name"
           :label="item.label"
           :prop="item.prop"
           :width="item.width || '120px'"
           :align="item.align || 'center'"
           >
      <template slot-scope="scope">
        <span>{{ scope.row[item.name] }}</span>
      </template>
    </el-table-column>
       <slot></slot>
  </el-table>
</template>
<script type="text/javascript">
export default {
  name: 'ExpandTable',
  props: ['data', 'tableKey', 'listLoading']
}
</script>

 <style >
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    white-space: pre-wrap;
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
 </style>

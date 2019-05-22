<template>
  <div class="app-container">
    <!--数据列表上方 开始-->
    <!--新增 开始-->
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    <!--新增 结束-->
    <!--数据列表上方 结束-->
    <!--数据列表表单 开始-->
    <expandTable :data="tableList" :tableKey="tableConfig" :listLoading="listLoading">
      <el-table-column  label="操作" width="220" align="center">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
      </template>
    </el-table-column>
    </expandTable>

    <!--数据列表表单 结束-->
    <!--页码 开始-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" />
    <!--页码 结束-->

    <!--新增编辑表单 开始-->
    <addEditForm ref="addEditForm" :dialogStatus="dialogStatus" :dialogFormVisible="dialogVisible"  @getlist="getList()" @cancel="resetDialog()"></addEditForm>
    <!--新增编辑表单 结束-->
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addEditForm from './Form/Form'
import expandTable from '@/components/Table/expandTable'

export default {
  name: 'InterpMainTable',
  components: { Pagination, addEditForm, expandTable },
  props: {
    tableConfig: {
      type: Array
    },
    fetchList: {
      type: Function,
      default: null
    },
    deleteRecord: {
      type: Function,
      default: null
    },
    getPrimary: {
      type: Function,
      default: null
    },
    getSecondary: {
      type: Function,
      default: null
    },
    getIndicate: {
      type: Function,
      default: null
    },
    createDataForm: {
      type: Function,
      default: null
    },
    updateDataForm: {
      type: Function,
      default: null
    },
    subConfig: {
      type: Object
    },
    formData: {
      type: Object
    }
  },
  provide() {
    return {
      InterpMainApp: this
    }
  },
  data() {
    return {
      diaTableKey: [],
      diaTableData: [],
      dialogTableVisible: false,
      diaTitle: '',
      tableList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 10,
        sort: '+id'
      },
      deleted: {
        id: null
      },
      subFormInfo: this.formData,
      dialogVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.fetchList(this.listQuery).then(response => {
        console.log(response.data)
        this.tableList = response.data.results
        for (const i of this.tableList) {
          i.id = (Array(4).join('0') + i.id).slice(-4) // 得到特定长度
          // i.disease_code = i.primary_code + i.disease_code // 更替disase_code
        }
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    async handleDelete(row) {
      if (confirm('确定要删除吗？')) {
        this.deleted.id = row.id
        const info = await this.deleteRecord(this.deleted)
        if (info.status === 200) {
          this.$message('指标项:' + ';删除' + '成功')
        }
        this.getList(1)
      }
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetDialogTable() {
      this.dialogTableVisible = false
    },
    resetDialog() {
      this.dialogVisible = false // dialog关闭
      // this.$refs.addEditForm.resetTable() // 调用Form中的重置数据 ，重置table可编辑表单
      // this.subFormInfo = this.formData // 调用index传递过来的formData 重置表单
      // this.getList()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      for (var name in this.subFormInfo) {
        if (name !== 'primary_name') {
          this.subFormInfo[name] = ''
        }
      }
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.dialogFormInfo = Object.assign({}, row) // copy obj
      for (var name in this.subFormInfo) {
        this.subFormInfo[name] = this.dialogFormInfo[name]
      }
      this.subFormInfo.male_incidence = parseFloat(this.dialogFormInfo.male_incidence)
      this.subFormInfo.female_incidence = parseFloat(this.dialogFormInfo.female_incidence)
      this.subFormInfo.id = this.dialogFormInfo.id
      this.dialogStatus = 'update'
      this.dialogVisible = true
    }
  }
}

</script>

<template>
  <div class="app-container">
    <!--数据列表上方 开始-->
    <!--新增 开始-->
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    <!--新增 结束-->
    <!--数据列表上方 结束-->
    <!--数据列表表单 开始-->
    <el-table v-loading="listLoading" :data="tableList" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label="$t('table.disease_profile')">
              <span>{{ props.row.disease_profile }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.risk_factor')">
              <span>{{ props.row.risk_factor }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.early_symptoms')">
              <span>{{ props.row.early_symptoms }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.privention_advice')">
              <span>{{ props.row.privention_advice }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.medical_examination_instructions')">
              <span>{{ props.row.medical_examination_instructions }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="No." width="70px" align="center" />
      <el-table-column :label="$t('table.disease_code')" prop="product_class" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.indicate_class')" prop="indicate_class" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.indicate_class }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.secondary_name')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.secondary_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.female_incidence')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.female_incidence }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.male_incidence')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.male_incidence }}</span>
        </template>
      </el-table-column>
       <el-table-column show-overflow-tooltip :label="$t('table.disease_profile')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.disease_profile }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="$t('table.risk_factor')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.risk_factor }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="$t('table.early_symptoms')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.early_symptoms }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="$t('table.privention_advice')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.privention_advice }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="$t('table.medical_examination_instructions')" prop="secondary_name" align="center" width="120px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.medical_examination_instructions }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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

export default {
  name: 'InterpMainTable',
  components: { Pagination, addEditForm },
  props: {
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
      console.log(this.dialogFormInfo)
      this.subFormInfo.id = this.dialogFormInfo.id
      this.dialogStatus = 'update'
      this.dialogVisible = true
    }
  }
}

</script>

 <style>
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

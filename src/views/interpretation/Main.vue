<template>
  <div class="app-container">
    <!--数据列表上方 开始-->
    <!--新增 开始-->
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <!--新增 结束-->
    <!--数据列表上方 结束-->
    <!--数据列表表单 开始-->
    <el-table v-loading="listLoading" :key="tableKey" :data="tableList" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column type="index" label="No." width="70px" align="center" />
      <el-table-column :label="$t('table.disease_code')" prop="product_class" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.indicate_name')" prop="indicate_name" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.indicate_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.primary_name')" prop="primary_name" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.primary_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.secondary_name')" prop="secondary_name" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.secondary_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="320px" class-name="small-padding fixed-width">
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
    <addEditForm ref="addEditForm" :dialogStatus="dialogStatus" :siteFormInfo="siteFormInfo" :dialogFormInfo="dialogFormInfo" :inEditForm="inEditForm" :dialogFormVisible="dialogVisible"  @cancel="resetDialog()"></addEditForm>
    <!--新增编辑表单 结束-->
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addEditForm from './Form/Form'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'InterpMainTable',
  components: { addEditForm, Pagination, UploadExcelComponent },
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
    getDisease: {
      type: Function,
      default: null
    },
    glistKnowlege: {
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
    inEditColumns: {
      type: Array
    },
    subConfig: {
      type: Object
    },
    formData: {
      type: Object
    },
    siteFormInfo: {
      type: Object
    },
    siteConfig: {
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
      tableKey: 0,
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
      dialogFormInfo: this.formData,
      dialogVisible: false,
      dialogStatus: '',
      inEditForm: []
    }
  },
  created() {
    this.getList()
  },
  watch: {
    formData(val) {
      this.dialogFormInfo = val
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      this.fetchList(this.listQuery).then(response => {
        this.tableList = response.data.results
        for (const i of this.tableList) {
          i.disease_code = (Array(4).join('0') + i.disease_code).slice(-4) // 得到特定长度
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
    resetDialog() {
      this.dialogVisible = false // dialog关闭
      this.$refs.addEditForm.resetTable() // 调用Form中的重置数据 ，重置table可编辑表单
      this.dialogFormInfo = this.formData // 调用index传递过来的formData 重置表单
      this.getList()
    },
    handleCreate() {
      console.log(this.dialogFormInfo)
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.dialogFormInfo = Object.assign({}, row) // copy obj
      console.log(this.dialogFormInfo)
      this.inEditForm = JSON.parse(this.dialogFormInfo.front_end_json)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    // 上传方法
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      const upload = { upload: results }
      console.log(JSON.stringify(upload))
      /* for (const i = 0;i <= results.length;i++){
        row = results[i]
        row.secondary_name
        var item = {}
        item.gene = row.gene
        item.effect_allele = row.effect_allele
        item.other_allele = row.other_allele
        item.jb_or = row.jb_or
        item.beta = row.beta
        item.CI = row.CI
        item.p_value = row.p_value
        item.reference = row.reference
        item.homeRefFrequency = row.homeRefFrequency
        item.hetFrequency = row.hetFrequency
        item.homAltFrequency = row.homAltFrequency
      } */
      /* recieveData(JSON.stringify(upload)).then(() => {
        this.$emit('cancel') // 调用父组件的cancer方法
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })*/
    }
  }
}

</script>

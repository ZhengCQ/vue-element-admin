<template>
  <div class="app-container">
    <!--数据列表上方 开始-->
    <!--新增 开始-->
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    <!--新增 结束-->
    <!--数据列表上方 结束-->
    <!--数据列表表单 开始-->
    <el-table v-loading="listLoading" :key="tableKey" :data="tableList" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column type="index" label="No." width="70px" align="center" />
      <el-table-column :label="$t('table.disease_code')" prop="product_class" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.disease_code }}</span>
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
    <addEditForm :dialogStatus="dialogStatus" :inEditForm="inEditForm" :dialogFormVisible="dialogVisible" :dialogFormInfo="dialogFormInfo" @cancel="dialogVisible = false;getList()"></addEditForm>
    <!--新增编辑表单 结束-->
  </div>
</template>
<script>
import { fetchList, deleteDisease } from '@/api/interpretation'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addEditForm from './Form'

export default {
  name: 'ComplexTable',
  components: { addEditForm, Pagination },
  data() {
    return {
      tableKey: 0,
      tableList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 20,
        sort: '+id'
      },
      dialogFormInfo: {
        primary_name: '',
        secondary_name: '',
        indicate_name: '',
        DiseaseKnowledges: ''
      },
      deleted: {
        id: null
      },
      dialogVisible: false,
      dialogStatus: '',
      inEditForm: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
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
        this.deleted.disease_code = row.disease_code
        const info = await deleteDisease(this.deleted)
        if (info.status === 200) {
          this.$message('指标项:' + ';删除' + '成功')
        }
        console.log(info)
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

    resetTemp() {
      this.dialogFormInfo = {
        primary_name: '',
        secondary_name: '',
        indicate_name: '',
        DiseaseKnowledges: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.inEditForm = []
    },
    handleUpdate(row) {
      console.log(row)
      this.dialogFormInfo = Object.assign({}, row) // copy obj
      this.inEditForm = JSON.parse(this.dialogFormInfo.front_end_json)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    }
  }
}

</script>

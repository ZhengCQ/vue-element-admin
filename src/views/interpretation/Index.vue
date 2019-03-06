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
      <el-table-column :label="$t('table.disease_name')" prop="disease_name" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.disease_name }}</span>
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
    <addEditForm
                  :dialogStatus="dialogStatus"
                  :dialogFormVisible="dialogFormVisible"
                  :temp="temp"
                  @cancel="dialogFormVisible = false;"></addEditForm>
    <!--新增编辑表单 结束-->
  </div>
</template>
<script>
import { fetchList } from '@/api/interpretation'
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
      temp: {
        disease_name: '',
        primary_name: '',
        secondary_name: '',
        indicate_name: '',
        knowledge_name: ''
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableList = response.data.diseases
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDelete(row) {
      console.log(row)
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
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '上线',
        indicators: '',
        appendixs: '',
        agencies: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    }
  }
}
</script>

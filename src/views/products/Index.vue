<template>
  <div class="app-container">
    <!--数据列表上方 开始-->
    <div class="filter-container">
      <!--搜索-->
      <el-input :placeholder="$t('table.product_name')" v-model="listQuery.product_name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input :placeholder="$t('table.product_manager')" v-model="listQuery.product_manager" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.state" :placeholder="$t('table.status')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <!--新增-->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <!--excel导出-->
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>
    <!--数据列表上方 结束-->
    <!--数据列表表单 开始-->
    <el-table v-loading="listLoading" :key="tableKey" :data="productsList" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column type="index" label="No." width="70px" align="center" />
      <el-table-column :label="$t('table.product_id')" prop="id" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.product_class')" prop="product_class" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.product_class }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.product_manager')" prop="product_manager" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.product_manager }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.product_name')" prop="product_name" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span class="link-type" @click="handleFetchItems(scope.row.pageviews)">{{ scope.row.product_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" class-name="status-col" width="160px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="320px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.state!='上线'" size="mini" type="success" @click="handleModifyStatus(scope.row,'上线')">{{ $t('table.online') }}
          </el-button>
          <el-button v-if="scope.row.state!='下线'" size="mini" @click="handleModifyStatus(scope.row,'下线')">{{ $t('table.offline') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--列表数据表单 结束-->

    <!--页码 开始-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!--页码 结束-->

    <!--新增编辑表单 开始-->
    <addEditForm
                 :dialogStatus="dialogStatus"
                 :dialogFormVisible="dialogVisible"
                 :dialogFormInfo="dialogFormInfo"
                 :statusOptions="statusOptions"
                 :treeidRaw="treeid"
                 @cancel="dialogVisible = false;getList()" />
    <!--新增编辑表单 结束-->

    <!--产品检测项列表 开始-->
    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!--产品检测项列表 结束-->
  </div>
</template>
<script>
import { glistProduct, gdeleteProduct } from '@/api/product'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // Waves directive
import addEditForm from './Form'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination, addEditForm },
  directives: { waves },
  filters: {
    statusFilter(state) {
      const statusMap = {
        上线: 'success',
        下线: 'danger'
      }
      return statusMap[state]
    }
  },
  data() {
    return {
      tableKey: 0,
      productsList: null,
      total: 0,
      treeid: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        product_manager: undefined,
        product_name: undefined,
        sort: '+id',
        state: undefined
      },
      dialogFormInfo: {
        product_name: '',
        product_class: '',
        product_manager: '',
        state: '',
        diseases: [],
        drug: [],
        personality: []
      },
      dialogVisible: false,
      dialogPvVisible: false,
      pvData: [],
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      statusOptions: ['上线', '下线'],
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      glistProduct(this.listQuery).then(response => {
        console.log(response.data)
        this.productsList = response.data.results
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.dialogFormInfo = {
        product_name: '',
        product_class: '',
        product_manager: '',
        state: '',
        diseases: [],
        drug: [],
        personality: []
      }
      this.treeid = 0
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.resetTemp()
      this.dialogFormInfo = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.state = status
    },
    async handleDelete(row) {
      if (confirm('确定要删除吗？')) {
        const info = await gdeleteProduct(row.id)
        if (info.status === 200) {
          this.$message('产品:' + row.product_name + ';删除' + '成功')
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
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['时间', '产品序号', '产品类型', '产品经理', '产品名称', '产品状态']
        const filterVal = ['timestamp', 'id', 'product_class', 'product_manager', 'product_name', 'status']
        const data = this.formatJson(filterVal, this.productsList)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'product_list_page_' + this.listQuery.page
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}

</script>

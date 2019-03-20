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
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.material_name')" prop="material_name" align="center" width="160px" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.material_name }}</span>
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
    <addEditForm :dialogStatus="dialogStatus" :dialogFormVisible="dialogVisible" :dialogFormInfo="dialogFormInfo" @cancel="dialogVisible = false;getList()"></addEditForm>
    <!--新增编辑表单 开始-->
    <!--新增编辑表单 结束-->
  </div>
</template>
<script>
import { glistKnowlege, pdeleteKnowlege } from '@/api/knowledges'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addEditForm from '../Form'
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
      deleted: {
        id: null
      },
      dialogFormInfo: {
        richTextFormatContent: '',
        material_name: ''
      },
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
      glistKnowlege(this.listQuery).then(response => {
        this.tableList = response.data.results
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
        await pdeleteKnowlege(this.deleted)
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
        material_name: '',
        richTextFormatContent: ''
      }
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
    }
  }
}

</script>

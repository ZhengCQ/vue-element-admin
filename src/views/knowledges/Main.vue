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
          <span>{{ scope.row.knowledge_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="320px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--数据列表表单 结束-->
    <!--页码 开始-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" />
    <!--页码 结束-->
    <addEditForm
                 :dialogStatus="dialogStatus"
                 :dialogFormVisible="dialogVisible"
                 :dialogFormInfo="dialogFormInfo"
                 :paddKnowlege="paddKnowlege"
                 :peditKnowlege="peditKnowlege"
                 @cancel="dialogVisible = false;getList()" />
    <!--新增编辑表单 开始-->
    <!--新增编辑表单 结束-->
  </div>
</template>
<script>
import { prefixInteger } from '@/utils/prefixinteger'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addEditForm from './Form'
export default {
  name: 'ComplexTable',
  components: { addEditForm, Pagination },
  props: {
    glistKnowlege: {
      type: Function,
      default: null
    },
    pdeleteKnowlege: {
      type: Function,
      default: null
    },
    paddKnowlege: {
      type: Function,
      default: null
    },
    peditKnowlege: {
      default: null
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
        page_size: 20,
        sort: '+id'
      },
      deleted: {
        id: null
      },
      dialogFormInfo: {
        richTextFormatContent: '',
        knowledge_name: ''
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
      this.glistKnowlege(this.listQuery).then(response => {
        console.log(response.data)
        this.tableList = response.data.results
        this.total = response.data.total
        for (const i of this.tableList) {
          i.id = prefixInteger(i.id, 5)
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    async handleDelete(row) {
      if (confirm('确定要删除吗？')) {
        this.deleted.id = row.id
        const info = await this.pdeleteKnowlege(this.deleted)
        if (info.status === 200) {
          this.$message('素材:' + row.material_name + ';删除' + '成功')
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

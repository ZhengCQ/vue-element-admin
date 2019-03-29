<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="textMap[dialogStatus]" :visible="dialogVisible" @close="onCancel" customClass="customWidth">
    <el-form :model="dialogFormInfo" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item :label="$t('table.primary_name')" prop="name">
        <el-autocomplete class="input" v-model="dialogFormInfo.primary_name" :fetch-suggestions="querySearchPri" placeholder="请点击选择一级分类" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.secondary_name')" prop="name">
        <el-autocomplete class="input" v-model="dialogFormInfo.secondary_name" :fetch-suggestions="querySearchSec" placeholder="请点击选择二级分类" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.indicate_name')" prop="name">
        <el-autocomplete class="input" v-model="dialogFormInfo.indicate_name" :fetch-suggestions="querySearchIndi" placeholder="请输入指标名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.knowledge_name')" prop="name">
        <el-autocomplete class="input" v-model="dialogFormInfo.knowledge_name" :fetch-suggestions="querySearchKlg" placeholder="关联知识库" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.snp_name')" prop="name">
        <el-autocomplete class="input" v-model="dialogFormInfo.snps" :fetch-suggestions="querySearchIndi" placeholder="新增位点" @select="handleSelect"></el-autocomplete>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleAddSnps">{{ $t('table.addsnps') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="explainList" border fit highlight-current-row style="width: 100%">
      <el-table-column min-width="40px" align="center" label="SNPs">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.snps" size="small" />
          </template>
          <span v-else>{{ scope.row.snps }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="40px" align="center" label="Gene">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.gene" size="small" />
          </template>
          <span v-else>{{ scope.row.gene }}</span>
        </template>
      </el-table-column>
        <el-table-column min-width="40px" align="center" label="EffectAllele">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.effectAllele" size="small" />
          </template>
          <span v-else>{{ scope.row.effectAllele }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="40px" align="center" label="OR">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.or" size="small" />
          </template>
          <span v-else>{{ scope.row.or }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="40px" align="center" label="beta">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.beta" size="small" />
          </template>
          <span v-else>{{ scope.row.beta }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="40px" align="center" label="pvalue">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.pvalue" size="small" />
          </template>
          <span v-else>{{ scope.row.pvalue }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">OK</el-button>
          <el-button v-else type="primary" size="small" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelRs(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
  <!--新增编辑表单 结束-->
</template>
<script type="text/javascript">
import { getPrimary, getSecondary, getDisease, createDataForm, updateDataForm } from '@/api/interpretation'

export default {
  data() {
    return {
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      listLoading: false,
      state1: '',
      dialogVisible: this.dialogFormVisible,
      explainList: []
    }
  },
  props: {
    dialogStatus: {
      type: String
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    dialogFormInfo: {
      type: Object
    }
  },
  watch: {
    dialogFormVisible(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    // queryString 为在框中输入的值
    // callback 回调函数,将处理好的数据推回
    querySearchPri(queryString, callback) {
      var list = [{}]
      // 从后台获取到对象数组
      getPrimary('name').then((response) => {
        // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for (const i of response.data.result) {
          i.value = i.name // 将想要展示的数据作为value
        }
        list = response.data.result
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    querySearchSec(queryString, callback) {
      var list = [{}]
      // 从后台获取到对象数组
      const primary_name = this.dialogFormInfo.primary_name
      getSecondary(String(primary_name)).then((response) => {
        // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for (const i of response.data.secondary) {
          i.value = i.name // 将想要展示的数据作为value
        }
        list = response.data.secondary
        console.log(list)
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    querySearchIndi(queryString, callback) {
      var list = [{}]
      // 从后台获取到对象数组
      const secondary_name = this.dialogFormInfo.secondary_name
      getDisease(String(secondary_name)).then((response) => {
        // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for (const i of response.data.diseases) {
          i.value = i.indicate_name // 将想要展示的数据作为value
        }
        list = response.data.diseases
        list = queryString ? list.filter(this.createFilter(queryString)) : list
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    createFilter(queryString) {
      return (result) => {
        return (result.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearchKlg(queryString, callback) {},
    handleSelect(item) {
      console.log(item)
    },
    handleAddSnps() {
      const sites = {
        snps: '',
        gene: '',
        effectAllele: '',
        or: '',
        beta: '',
        title: '',
        pvalue: '',
        edit: false
      }
      sites.snps = this.dialogFormInfo.snps
      this.explainList.push(sites)
    },
    confirmEdit(row) {
      row.edit = false
      this.explainList.forEach((item) => {
        if (item.snp === row.snp) {
          item.gene === row.gene
          item.effectAllele === row.effectAllele
          item.or === row.or
          item.beta === row.beta
          item.title === row.title
          item.pvalue === row.pvalue
          console.log(row.gene)
          this.$message({
            message: row.gene + '更新成功',
            type: 'success'
          })
        }
      })
      console.log(this.explainList)
    },
    handleDelRs(row) {
      this.explainList.forEach((item, index) => {
        if (item.snp === row.snp) {
          this.explainList.splice(index, 1)
        }
      })
    },
    createData() {
      this.dialogFormInfo.results = []
      this.dialogFormInfo.results = JSON.stringify(this.explainList)
      console.log(this.dialogFormInfo)
      createDataForm(this.dialogFormInfo).then(() => {
        this.dialogVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.dialogFormInfo)
      console.log(tempData)
      updateDataForm(tempData).then(() => {
        for (const v of this.list) {
          if (v.id === this.dialogFormInfo.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.dialogFormInfo)
            break
          }
        }
        this.dialogVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style>
.customWidth {
  width: 60%;
}
</style>

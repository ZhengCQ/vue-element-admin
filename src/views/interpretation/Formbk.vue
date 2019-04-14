<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="textMap[dialogStatus]" :visible="dialogVisible" @close="onCancel" customClass="customWidth">
    <el-form :model="indicateForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item :label="$t('table.primary_name')" prop="name">
        <el-autocomplete class="input" v-model="indicateForm.primary_name" :fetch-suggestions="querySearchPri" placeholder="请点击选择一级分类" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.secondary_name')" prop="name">
        <el-autocomplete class="input" v-model="indicateForm.secondary_name" :fetch-suggestions="querySearchSec" placeholder="请点击选择二级分类" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.indicate_name')" prop="name">
        <el-autocomplete class="input" v-model="indicateForm.indicate_name" :fetch-suggestions="querySearchIndi" placeholder="请输入指标名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.knowledge_name')" prop="name">
        <el-autocomplete class="input" v-model="indicateForm.knowledge_name" :fetch-suggestions="querySearchKlg" placeholder="关联知识库"  @select="handleSelect"></el-autocomplete>
      </el-form-item>
    </el-form>
    <!--添加位点开始-->
    <!--增加按钮-->
    <el-button v-if="showValueForm === false" type="success" size="large"  @click="showValueForm=!showValueForm">新增位点</el-button>
    <el-button v-else type="primary" size="large" @click="showValueForm=!showValueForm">关闭新增</el-button>
    <!--位点表单-->
    <siteFormModel :siteForm="siteForm" :showValueForm="showValueForm">
      <slot>
        <el-button type="primary" @click="handleCreateSnps">确定新增</el-button>
      </slot>
    </siteFormModel>
    <!--添加位点 结束-->
    <!--可编辑表格 开始-->
    <inEditTable :data="explainList" :columns="columns">
        <template  slot="operation" slot-scope="{scope}">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">OK</el-button>
          <el-button v-else type="primary" size="small" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelRs(scope.row)">删除</el-button>
        </template>
    </inEditTable>
    <!--可编辑表格 结束-->
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
  <!--新增编辑表单 结束-->
</template>
<script type="text/javascript">
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import inEditTable from './inEditTable'
import siteFormModel from './siteForm'
import transQueryList from '@/utils/utils'

export default {
  components: { inEditTable, UploadExcelComponent, siteFormModel },
  inject: ['InterpMainApp'],
  data() {
    return {
      textMap: {
        update: '编辑',
        create: '新建'
      },
      siteForm: {},
      indicateForm: this.dialogFormInfo,
      // 该columns是可编辑表格的
      columns: this.InterpMainApp.inEditColumns,
      sites: {},
      listLoading: false,
      showValueForm: false,
      siteid: 0,
      state1: '',
      dialogVisible: this.dialogFormVisible,
      explainList: this.inEditForm
    }
  },
  props: {
    dialogStatus: {
      type: String
    },
    inEditForm: {
      type: Array
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
    },
    dialogFormInfo(val) {
      this.indicateForm = val
    },
    inEditForm(val) {
      this.explainList = val
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    // 一级分类
    async querySearchPri(queryString, callback) {
      var itemData = await this.InterpMainApp.getPrimary('name')
      itemData = itemData.data.result
      const list = transQueryList(queryString, itemData)
      callback(list)
    },
    // 二级分类
    async querySearchSec(queryString, callback) {
      const name = this.indicateForm.primary_name
      var itemData = await this.InterpMainApp.getSecondary(name)
      itemData = itemData.data.secondary
      const list = transQueryList(queryString, itemData)
      callback(list)
    },
    // 指标
    async querySearchIndi(queryString, callback) {
      const name = this.indicateForm.secondary_name
      var itemData = await this.InterpMainApp.getDisease(name)
      itemData = itemData.data.diseases
      // 统一为name 用来转换为value
      for (const i of itemData) {
        i.name = i.indicate_name
      }
      const list = transQueryList(queryString, itemData)
      callback(list)
    },
    // 知识库
    async querySearchKlg(queryString, callback) {
      const primary_name = this.indicateForm.primary_name
      const knowledge_name = this.inEditForm.knowledge_name
      // 需要一级分类和知识素材名称
      var itemData = await this.InterpMainApp.glistKnowlege(primary_name, knowledge_name)
      itemData = itemData.data.result
      const list = transQueryList(queryString, itemData)
      callback(list)
    },
    // rs
    async querySearchRs(queryString, callback) {
      const name = this.siteForm.rs_name
      var itemData = await this.InterpMainApp.gfindRsName(name)
      itemData = itemData.data.rs_name
      const list = transQueryList(queryString, itemData)
      callback(list)
    },
    handleSelect(item) {
      console.log(item)
    },
    resetSites() {
      this.siteForm = {
        rs_name: '',
        gene: '',
        effect_allele: '',
        other_allele: '',
        jb_or: '',
        beta: '',
        homeRefFrequency: '',
        hetFrequency: '',
        homAltFrequency: ''
      }
    },
    handleCreateSnps() {
      const sites = {
        id: '',
        rs_name: '',
        gene: '',
        effect_allele: '',
        other_allele: '',
        jb_or: '',
        beta: '',
        CI: '',
        p_value: '',
        reference: '',
        homeRefFrequency: '',
        hetFrequency: '',
        homAltFrequency: '',
        edit: false
      }
      this.siteid++
      sites.id = this.siteid
      sites.rs_name = this.siteForm.rs_name
      sites.gene = this.siteForm.gene
      sites.effect_allele = this.siteForm.effect_allele
      sites.other_allele = this.siteForm.other_allele
      sites.homeRefFrequency = this.siteForm.homeRefFrequency
      sites.hetFrequency = this.siteForm.hetFrequency
      sites.homAltFrequency = this.siteForm.homAltFrequency
      this.explainList.push(sites)
      this.showValueForm = false
      this.resetSites()
    },
    confirmEdit(row) {
      row.edit = false
      this.explainList.forEach((item) => {
        if (item.id === row.id) {
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
          this.$message({
            message: row.gene + '更新成功',
            type: 'success'
          })
        }
      })
      console.log(this.explainList)
      console.log(this.dialogFormInfo)
    },
    handleDelRs(row) {
      this.explainList.forEach((item, index) => {
        if (item.snp === row.snp) {
          this.explainList.splice(index, 1)
        }
      })
    },
    createData() {
      this.indicateForm.results = []
      this.indicateForm.results = JSON.stringify(this.explainList)
      // this.indicateForm.results = this.explainList
      this.showValueForm = false // 重置新增位点页面
      this.InterpMainApp.createDataForm(JSON.stringify(this.indicateForm)).then(() => {
        this.$emit('cancel') // 调用父组件的cancer方法
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.indicateForm) // 从row 中赋值到data
      tempData.results = JSON.stringify(this.explainList) // 转回去的是results值，需要重新赋值
      console.log(JSON.stringify(tempData))
      this.showValueForm = false // 重置新增位点页面
      this.InterpMainApp.updateDataForm(JSON.stringify(tempData)).then(() => {
        this.$emit('cancel') // 调用父组件的cancer方法
        this.$notify({
          title: '成功',
          message: '创建成功',
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

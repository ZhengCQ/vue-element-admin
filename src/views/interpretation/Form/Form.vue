<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" @close="onCancel" customClass="customWidth">
    <!--添加基本信息开始-->
    <sub-el-form
                ref="subelform"
                :dialogFormInfo="dialogFormInfo">
    </sub-el-form>
    <!--添加基本信息结束-->

    <!--增加结论按钮-->
    <el-button v-if="showClusionForm === false" type="success" size="large"  @click="showClusionForm=!showClusionForm">新增结论</el-button>
    <el-button v-else type="primary" size="large" @click="showClusionForm=!showClusionForm">关闭结论</el-button>

    <!--添加结论开始-->
    <conclusion-form
                :showForm="showClusionForm">
    </conclusion-form>
    <inEditTable ref="inEditTable" :data="conclustionList" :columns="conclustionColumns">
    </inEditTable>
    <!--添加结论结束-->
    <!--增加按钮-->
    <el-button v-if="showValueForm === false" type="success" size="large"  @click="showValueForm=!showValueForm">新增位点</el-button>
    <el-button v-else type="primary" size="large" @click="showValueForm=!showValueForm">关闭位点</el-button>

    <!--位点表单-->
    <siteFormModel
                  ref="siteform"
                  :siteForm="siteForm"
                  :showValueForm="showValueForm">
      <slot>
        <el-button type="primary" @click="handleCreateSnps">确定新增</el-button>
      </slot>
    </siteFormModel>
    <!--添加位点 结束-->
    <!--可编辑表格 开始-->
    <inEditTable ref="inEditTable" :data="explainList" :columns="siteEditColumns">
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
import SubElForm from './subElForm'
import ConclusionForm from './conclusionForm.vue'

export default {
  components: { inEditTable, UploadExcelComponent, siteFormModel, SubElForm, ConclusionForm },
  inject: ['InterpMainApp'],
  data() {
    return {
      textMap: {
        update: '编辑',
        create: '新建'
      },
      siteForm: this.siteFormInfo,
      // 该columns是可编辑表格的
      siteEditColumns: this.InterpMainApp.siteEditColumns,
      conclustionColumns: this.InterpMainApp.conclustionColumns,
      sites: {},
      showValueForm: false,
      showClusionForm: false,
      siteid: 0,
      dialogVisible: this.dialogFormVisible,
      explainList: this.inEditForm,
      conclustionList: []
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
    inEditForm: { // 可编辑表格数据
      type: Array
    },
    dialogFormInfo: { // 基本信息表单
      type: Object
    },
    siteFormInfo: { // 位点信息表单
      type: Object
    },
    conclusionDiaForm: { // 结论表单
      type: Object
    }
  },
  watch: {
    dialogFormVisible(val) {
      this.dialogVisible = val
    },
    inEditForm(val) {
      this.explainList = val
      console.log(val)
    },
    siteFormInfo(val) {
      this.siteForm = val
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    resetData(Form) {
      // 重置表单中的值
      for (var name in Form) {
        if (typeof (Form) === String) {
          Form[name] = ''
        } else {
          Form[name] = null
        }
      }
    },
    resetTable() { // 主页面的cancer调用重置
      this.explainList = []
      this.showValueForm = false // 重置新增位点页面
    },
    handleCreateSnps() {
      const sitesTemp = Object.assign({}, this.$refs.siteform.siteForm2) // 将siteform的值赋值给explainList,给表格
      sitesTemp.id = this.siteid
      sitesTemp.edit = false
      this.siteid++
      this.explainList.push(sitesTemp)
      this.showValueForm = false
      this.resetData(this.siteForm) // 重置表单中的值
    },
    createData() {
      const tempData = Object.assign({}, this.$refs.subelform.indicateForm) // subelform从获取数据, 中赋值到data
      tempData.results = []
      tempData.results = JSON.stringify(this.$refs.inEditTable.tableData) // 从inEditTable中获取数据
      this.InterpMainApp.createDataForm(JSON.stringify(tempData)).then(() => {
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
      const tempData = Object.assign({}, this.$refs.subelform.indicateForm) // subelform从获取数据，中赋值到data
      tempData.results = JSON.stringify(this.$refs.inEditTable.tableData) // 传回后台的的是results值，需要重新赋值。从inEditTable中获取表格数据
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

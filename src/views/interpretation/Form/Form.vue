<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" @close="onCancel" customClass="customWidth">
    <!--添加基本信息开始-->
    <sub-el-form
                ref="subelform">
    </sub-el-form>
    <!--添加基本信息结束-->

    <!--增加结论按钮-->
    <el-button v-if="showClusionForm === false" type="success" size="large"  @click="showClusionForm=!showClusionForm">新增结论</el-button>
    <el-button v-else type="primary" size="large" @click="showClusionForm=!showClusionForm">关闭结论</el-button>

    <!--添加结论开始-->
    <conclusion-form
                ref="conclusionform"
                :showForm="showClusionForm">
      <slot>
        <el-button type="primary" @click="handleCreateConclusion">确定新增</el-button>
      </slot>
    </conclusion-form>
    <inEditTable ref="conclustionTable" :data="conclustionTableList" :columns="conclustionColumns">
    </inEditTable>
    <!--添加结论结束-->
    <!--增加按钮-->
    <el-button v-if="showValueForm === false" type="success" size="large"  @click="showValueForm=!showValueForm">新增位点</el-button>
    <el-button v-else type="primary" size="large" @click="showValueForm=!showValueForm">关闭位点</el-button>

    <!--位点表单-->
    <site-form
                  ref="siteform"
                  :showForm="showValueForm">
      <slot>
        <el-button type="primary" @click="handleCreateSnps">确定新增</el-button>
      </slot>
    </site-form>
    <!--添加位点 结束-->
    <!--可编辑表格 开始-->
    <inEditTable ref="siteTable" :data="siteTableList" :columns="siteEditColumns">
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
import inEditTable from '@/components/Table/inEditTable'
import SiteForm from './siteForm'
import SubElForm from './subElForm'
import ConclusionForm from './conclusionForm.vue'

export default {
  components: { inEditTable, UploadExcelComponent, SiteForm, SubElForm, ConclusionForm },
  inject: ['InterpMainApp'],
  data() {
    return {
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogVisible: this.dialogFormVisible,
      // 位点表单及可编辑表格
      siteEditColumns: this.InterpMainApp.siteEditColumns,
      showValueForm: false,
      siteTableList: this.siteEditForm,
      siteid: 0,
      // 结论表单及可编辑表格
      conclustionColumns: this.InterpMainApp.conclustionColumns,
      showClusionForm: false,
      conid: 0,
      conclustionTableList: this.conclustionEditForm
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
    siteEditForm: { // 可编辑表格数据
      type: Array
    },
    conclustionEditForm: { // 结论表单
      type: Array
    }
  },
  watch: {
    dialogFormVisible(val) {
      this.dialogVisible = val
    },
    siteEditForm(val) {
      this.siteTableList = val
    },
    conclustionEditForm(val) {
      val.forEach((item, index) => {
        if (!item.image_path.match(this.COMMON.webUrl)) {
          val[index].image_path = val[index].image_path = this.COMMON.webUrl + '/' + item.image_path
        }
      })
      this.conclustionTableList = val
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
      this.siteTableList = []
      this.showValueForm = false // 重置新增位点页面
      this.conclustionTableList = []
      this.showClusionForm = false
    },
    // 将每次的结论增加到结论表格中
    handleCreateConclusion() {
      const concluTemp = Object.assign({}, this.$refs.conclusionform.FormInfo) // 将siteform的值赋值给siteTableList,给表格
      concluTemp.evaluation_indicator = concluTemp.conclusion[2]
      concluTemp.conclusion = concluTemp.conclusion[1]
      concluTemp.id = this.conid // id赋值, 便于删除
      concluTemp.tempid = this.conid //

      // concluTemp.edit = false // 可编辑表单
      this.conid++
      this.conclustionTableList.push(concluTemp)
      this.showClusionForm = false
      this.resetData(this.$refs.conclusionform.FormInfo) // 重置表单中的值
    },
    // 将每次的位点增加到位点表格中
    handleCreateSnps() {
      this.$nextTick(() => {
        console.log(this.$refs.siteform)
        this.$refs.siteform.$children[0].validate((valid) => {
          if (valid) {
            const sitesTemp = Object.assign({}, this.$refs.siteform.FormInfo) // 将siteform的值赋值给siteTableList,给表格
            // sitesTemp.id = this.siteid
            sitesTemp.tempid = this.siteid
            if (sitesTemp.effect_allele === 'alt') {
              sitesTemp.effect_allele = sitesTemp.alt
            } else {
              sitesTemp.effect_allele = sitesTemp.ref
            }
            // sitesTemp.edit = false
            this.siteid++
            this.siteTableList.push(sitesTemp)
            this.showValueForm = false
            this.resetData(this.$refs.siteform.FormInfo) // 重置表单中的值
            this.$notify({
              title: '成功',
              message: '位点添加成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '失败',
              message: '表单验证失败',
              type: 'warning'
            })
          }
        })
      })
    },
    pre_conclustionTable(tableData) {
      tableData.forEach((item, index) => {
        if (item.id === item.tempid) {
          tableData[index].id = 0 // 表示是新加的，需要重新分配ID
        }
        if (item.image_path.match(this.COMMON.webUrl)) {
          tableData[index].image_path = item.image_path.replace(this.COMMON.webUrl + '/', '')
        }
      })
    },
    createData() {
      var tempData = Object.assign({}, this.InterpMainApp.subFormInfo) // subelform从获取数据, 中赋值到data
      tempData.site_result = []
      tempData.conclusion_result = []
      tempData.site_result = this.$refs.siteTable.tableData// 从inEditTable中获取数据,最终数据来自表格
      tempData.conclusion_result = this.$refs.conclustionTable.tableData
      this.pre_conclustionTable(tempData.conclusion_result)
      this.InterpMainApp.createDataForm(JSON.stringify(tempData)).then(() => {
        this.$emit('getlist')
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
      var tempData = Object.assign({}, this.$refs.subelform.indicateForm) // subelform从获取数据，中赋值到data
      tempData.site_result = this.$refs.siteTable.tableData // 传回后台的的是results值，需要重新赋值。从inEditTable中获取表格数据
      tempData.conclusion_result = this.$refs.conclustionTable.tableData
      console.log(tempData.conclusion_result)
      tempData.flag = 'all'
      this.pre_conclustionTable(tempData.conclusion_result)
      this.InterpMainApp.updateDataForm(JSON.stringify(tempData)).then(() => {
        this.$emit('getlist')
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
  width: 80%;
}

</style>

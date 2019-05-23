<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="title" :visible.sync="dialogVisible" @close="onCancel" customClass="customWidth">
    <!--增加结论按钮-->
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <el-button v-if="showClusionForm === false" type="success" size="large"  @click="showClusionForm=!showClusionForm">新增结论</el-button>
    <el-button v-else type="primary" size="large" @click="showClusionForm=!showClusionForm">关闭结论</el-button>

    <!--添加结论开始-->
    <conclusion-form
                ref="conclusionform"
                :showForm="showClusionForm"
                :FormData="Formdata"
                >
      <slot>
        <el-button type="primary" @click="handleCreateConclusion">确定新增</el-button>
      </slot>
    </conclusion-form>
    <inEditTable ref="conclustionTable" :expandshow="'true'" :data="conclustionTableList" :columns="conclustionColumns" :listLoading="listLoading">
    <el-table-column  label="弹框" width="110" align="center">
      <template slot-scope="scope">
          <el-button :disabled="(scope.row.id === 0)" type="primary" size="mini" @click="showClusionForm=!showClusionForm;handleEditRow(scope.row)">编辑/关闭</el-button>
      </template>
    </el-table-column>
    </inEditTable>

    <div slot="footer" class="dialog-footer">
      <!--el-button @click="onCancel">{{ $t('table.cancel') }}</el-button-->
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData();onCancel()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
  <!--新增编辑表单 结束-->
</template>
<script type="text/javascript">
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import inEditTable from '@/components/Table/inEditTable'
import ConclusionForm from './conclusionForm.vue'

export default {
  components: { inEditTable, UploadExcelComponent, ConclusionForm },
  inject: ['InterpMainApp'],
  data() {
    return {
      dialogVisible: this.dialogFormVisible,
      // 位点表单及可编辑表格
      showValueForm: false,
      // 结论表单及可编辑表格
      conclustionColumns: this.InterpMainApp.conclustionColumns,
      showClusionForm: false,
      conid: 0,
      Formdata: {},
      listLoading: false,
      conclustionTableList: this.conclustionEditForm
    }
  },
  props: ['title', 'dialogStatus', 'dialogFormVisible', 'conclustionEditForm'],
  watch: {
    dialogFormVisible(val) {
      this.dialogVisible = val
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
    handleEditRow(row) {
      this.Formdata = Object.assign({}, row)
      console.log(this.Formdata)
    },
    resetTable() { // 主页面的cancer调用重置
      this.conclustionTableList = []
      this.showClusionForm = false
    },
    // 将每次的结论增加到结论表格中
    handleCreateConclusion() {
      const concluTemp = Object.assign({}, this.$refs.conclusionform.FormInfo) // 将siteform的值赋值给siteTableList,给表格
      if (Array.isArray(concluTemp.conclusion_sel)) { // 重新做选择
        concluTemp.evaluation_indicator = concluTemp.conclusion_sel[2]
        concluTemp.conclusion = concluTemp.conclusion_sel[1]
      }
      if (!('id' in concluTemp)) { // 新增
        concluTemp.id = 0 // 便于新增后台识别
        concluTemp.tempid = this.conid // id赋值, 便于删除
        this.conclustionTableList.push(concluTemp)
        this.updateData()
      } else { // 编辑
        this.conclustionTableList.forEach((item, index) => {
          if (concluTemp.id === item.id) {
            var keys = ['conclusion', 'evaluation_indicator', 'explanation', 'image_path', 'indicate_id', 'interpretation_details', 'suggest']
            keys.forEach(key => {
              this.conclustionTableList[index][key] = concluTemp[key]
            })
            console.log(concluTemp)
          }
        })
      }
      // console.log(concluTemp)
      // concluTemp.edit = false // 可编辑表单
      // this.conid++
      this.showClusionForm = false
      this.resetData(this.$refs.conclusionform.FormInfo) // 重置表单中的值
    },
    pre_conclustionTable(tableData) {
      tableData.forEach((item, index) => {
        if (item.image_path.match(this.COMMON.webUrl)) {
          tableData[index].image_path = item.image_path.replace(this.COMMON.webUrl + '/', '')
        }
      })
    },
    updateData() {
      var tempData = {}
      tempData.id = this.$parent.dialogFormInfo.id
      var tempConclusTable = this.$refs.conclustionTable.tableData // 传回后台的的是results值，需要重新赋值。从inEditTable中获取表格数据
      this.pre_conclustionTable(tempConclusTable)
      tempData.conclusion_result = tempConclusTable
      tempData.flag = 'conclusion_result'
      console.log(JSON.stringify(tempData))
      this.InterpMainApp.updateDataForm(JSON.stringify(tempData)).then(() => {
        this.$emit('getlist')
        // this.onCancel()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
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
      upload.upload.forEach((item, index) => {
        // upload.upload[index].suggest = item.suggest.replace(/\\n/gm, '<br\>')
        upload.upload[index].id = 0
        // 'http://47.100.178.254:443//static/Images/CommonDisease/Detail/较低风险.jpg'
        upload.upload[index].image_path = this.COMMON.webUrl + '/' + upload.upload[index].image_path + '/' + upload.upload[index].conclusion + '.jpg'
      })
      this.conclustionTableList.push.apply(this.conclustionTableList, upload.upload)
      console.log(this.conclustionTableList)
      // console.log(this.siteTableList)
      // console.log(upload)
    }
  }
}

</script>
<style>
.customWidth {
  width: 80%;
}

</style>

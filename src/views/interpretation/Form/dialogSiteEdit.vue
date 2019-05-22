<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="title" :visible.sync="dialogVisible" @close="onCancel" customClass="customWidth">
    <!--增加按钮-->
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
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
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData();onCancel()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
  <!--新增编辑表单 结束-->
</template>
<script type="text/javascript">
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import inEditTable from '@/components/Table/inEditTable'
import SiteForm from './siteForm'

export default {
  components: { inEditTable, UploadExcelComponent, SiteForm },
  inject: ['InterpMainApp'],
  data() {
    return {
      dialogVisible: this.dialogFormVisible,
      // 位点表单及可编辑表格
      siteEditColumns: this.InterpMainApp.siteEditColumns,
      showValueForm: false,
      siteTableList: this.siteEditForm,
      siteid: 0
    }
  },
  props: ['title', 'dialogStatus', 'dialogFormVisible', 'siteEditForm'],
  watch: {
    dialogFormVisible(val) {
      this.dialogVisible = val
    },
    siteEditForm(val) {
      this.siteTableList = val
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
    },
    // 将每次的位点增加到位点表格中
    handleCreateSnps() {
      this.$refs.siteform.$children[0].validate((valid) => {
        if (valid) {
          const sitesTemp = Object.assign({}, this.$refs.siteform.FormInfo) // 将siteform的值赋值给siteTableList,给表格
          // sitesTemp.id = this.siteid
          sitesTemp.tempid = this.siteid
          sitesTemp.id = 0 // 表示新增加
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
          this.updateData()
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
    },
    updateData() {
      var tempData = {}
      tempData.id = this.$parent.dialogFormInfo.id
      tempData.site_result = this.$refs.siteTable.tableData // 传回后台的的是results值，需要重新赋值。从inEditTable中获取表格数据
      tempData.flag = 'rs_site'
      console.log(tempData)
      this.InterpMainApp.updateDataForm(JSON.stringify(tempData)).then(() => {
        this.$emit('getlist')
        this.$notify({
          title: '成功',
          message: '创建成功',
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
        upload.upload[index].id = 0
      })
      this.siteTableList.push.apply(this.siteTableList, upload.upload)
      console.log(this.siteTableList)
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

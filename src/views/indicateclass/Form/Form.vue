<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" @close="onCancel" customClass="customWidth">
    <!--添加基本信息开始-->
    <sub-el-form
                ref="subelform">
    </sub-el-form>
    <!--添加基本信息结束-->

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
  <!--新增编辑表单 结束-->
</template>
<script type="text/javascript">
import SubElForm from './subElForm.vue'

export default {
  components: { SubElForm },
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
    createData() {
      const tempData = Object.assign({}, this.InterpMainApp.subFormInfo) // subelform从获取数据, 中赋值到data
      console.log(tempData)
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
      const tempData = Object.assign({}, this.$refs.subelform.indicateForm) // subelform从获取数据，中赋值到data
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

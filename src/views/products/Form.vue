<template>
  <el-dialog :title="textMap[dialogStatus]" :visible="dialogVisible" @close="onCancel" customClass="customWidth">
    <el-form :rules="rules" :model="dialogFormInfo" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item :label="$t('table.product_name')" prop="name">
        <el-input v-model="dialogFormInfo.product_name" />
      </el-form-item>
      <el-form-item :label="$t('table.product_class')" prop="product_class">
        <el-select v-model="dialogFormInfo.product_class" class="filter-item" placeholder="Please select">
          <el-option v-for="item in classTypeOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.status')" prop="status">
        <el-select v-model="dialogFormInfo.state" class="filter-item" placeholder="Please select">
          <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.product_manager')" prop="product_manager">
        <el-select v-model="dialogFormInfo.product_manager" class="filter-item" placeholder="Please select">
          <el-option v-for="item in managerOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-cascader :options="optionPrimary" @active-item-change="handleItemChange" :props="optionProps" @change="handleValue"></el-cascader>
    </el-form>
    <div style="text-align: center">
      <el-transfer style="text-align: left; display: inline-block" filterable v-model="transfer.value" :data="transfer.data">
      </el-transfer>
    </div>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAddTreeData">{{ $t('table.add') }}</el-button>
    <div>
      <tree-table :data="treedata" :columns="treecolumns" border />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
import { getSecondary, getDisease, createDataForm, updateDataForm } from '@/api/product'
import treeTable from '@/components/TreeTable'
export default {
  components: { treeTable },
  data() {
    return {
      // 穿越框
      transfer: {
        data: [],
        value: []
      },
      // 树形表格 表头
      treecolumns: [{
        text: '分类',
        value: 'event',
        width: 200
      },
      {
        text: '数量',
        value: 'number'
      },
      {
        text: '指标',
        value: 'indicate_name'
      }],
      // 树形表格 数据
      treedata: [],
      primary_name: null,
      secondary_name: null,
      indicate_name: [],
      textMap: {
        update: '编辑',
        create: '新建'
      },
      state1: '',
      dialogVisible: this.dialogFormVisible,
      classTypeOptions: ['FGDP', 'OCLT'],
      // 表单输入规则
      rules: {
        name: [{ required: true, message: '产品名称必填且名称需唯一', trigger: 'change' }],
        product_class: [{ required: true, message: 'product_class is required', trigger: 'change' }],
        status: [{ required: true, message: 'status is required', trigger: 'blur' }],
        product_manager: [{ required: true, message: '产品经理必选', trigger: 'change' }]
      },
      managerOptions: ['罗宏敏', '汤丽慧', '翟晶'],
      optionPrimary: [{
        label: '常见疾病',
        secondary: []
      }, {
        label: '个性特征',
        secondary: []
      }, {
        label: '药物代谢',
        secondary: []
      }],
      optionProps: {
        value: 'label',
        children: 'secondary'
      }
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
    },
    statusOptions: {
      type: Array
    }
  },
  watch: {
    dialogFormVisible(val) {
      this.dialogVisible = val
    },
    data2(val) {
      this.data2 = val
      console.log(this.data2)
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    handleSelect(item) {
      console.log(item)
    },
    async createData() {
      console.log(this.dialogFormInfo)
      console.log(this.transfer.value)
      const range = await createDataForm(this.dialogFormInfo)
      if (range) {
        this.$message('产品:' + this.dialogFormInfo.product_name + ';创建' + '成功')
        this.onCancel()
      }
    },
    async updateData() {
      const tempData = Object.assign({}, this.dialogFormInfo)
      const range = await updateDataForm(tempData)
      if (range) {
        this.$message('产品:' + this.dialogFormInfo.product_name + ';更新' + '成功')
        this.onCancel()
      }
    },
    querySearchSec(queryString) {
      // 从后台获取到对象数组
      var list = []
      getSecondary(queryString).then((response) => {
        for (const i of response.data.secondary) {
          if (i.name) {
            list.push({
              label: i.name
            })
          }
        }
      }).catch((error) => {
        console.log(error)
      })
      return (list)
    },
    // 获得二级菜单
    handleItemChange(val) {
      console.log('active item:', val)
      setTimeout(_ => {
        if (val.indexOf('常见疾病') > -1 && !this.optionPrimary[0].secondary.length) {
          this.optionPrimary[0].secondary = this.querySearchSec('常见疾病')
        } else if (val.indexOf('药物代谢') > -1 && !this.optionPrimary[1].secondary.length) {
          this.optionPrimary[0].secondary = this.querySearchSec('药物代谢')
        } else if (val.indexOf('个性特征') > -1 && !this.optionPrimary[2].secondary.length) {
          this.optionPrimary[0].secondary = this.querySearchSec('个性特征')
        }
      }, 300)
    },
    resetTransfer() {
      this.transfer = {
        data: [],
        value: []
      }
    },
    handleValue(val) {
      this.primary_name = val[0]
      this.secondary_name = val[1]
      this.resetTransfer()
      getDisease(this.secondary_name).then((response) => {
        response.data.diseases.forEach((item, index) => {
          this.transfer.data.push({
            label: item.indicate_name,
            key: index
          })
        })
      })
    },
    handleAddTreeData() {
      const tempIndi = []
      this.transfer.data.forEach((item, index) => {
        if (item.key in this.transfer.value) {
          tempIndi.push(item.label)
        }
      })
      const tempData = {
        event: this.primary_name,
        number: 2,
        indicate_name: tempIndi,
        children: [{
          event: this.secondary_name,
          number: 2,
          indicate_name: tempIndi
        }]
      }
      this.treedata.push(tempData)
      console.log(this.treedata)
    }
  }
}

</script>
<style>
.customWidth {
  width: 60%;
}

</style>

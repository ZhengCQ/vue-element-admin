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
      <!--多级远程搜索指标开始-->
      <el-cascader :options="optionPrimary" @active-item-change="handleItemChange" :props="optionProps" @change="handleValue"></el-cascader>
      <!--多级远程搜索指标结束-->
    </el-form>
    <!--穿越框开始-->
    <div style="text-align: center">
      <el-transfer style="text-align: left; display: inline-block" :titles="['来源', '目标']" :button-texts="['去除指标', '添加指标']" filterable v-model="transfer.value" :data="transfer.data">
      </el-transfer>
    </div>
    <!--穿越框结束-->
    <!--添加到列表开始-->
    <div style="text-align: center; margin-top:10px;margin-bottom:10px;">
    <el-button :disabled="(this.transfer.value.length===0) || (this.primaryLst.includes(this.primary_name))" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleAddTreeData">添加指标到父节点</el-button>
    </div>
    <!--添加到列表结束-->
    <!--树状表格开始-->
    <div>
      <tree-table ref="TreeTable" :key="treekey" :default-expand-all="false" :data="treedata" :columns="treecolumns" border>
        <!--删除开始-->
        <template slot="operation" slot-scope="{scope}">
          <el-button size="mini" :disabled="!(scope.row.children)" type="primary" @click="addMenuItem(scope.row,'children')">增加指标到该节点
          </el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
        </template>
         <!--删除结束-->
      </tree-table>
      <!--树状表格开始-->
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
import { getSecondary, gallDisease, gallPersonality, gallDrug, createDataForm, updateDataForm } from '@/api/product'
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
      treekey: 1,
      treeid: this.treeidRaw,
      treecolumns: [{
        label: '选择框',
        checkbox: true
      },
      {
        label: '编号',
        key: 'id',
        expand: true
      },
      {
        label: '分类',
        key: 'event'
      },
      {
        label: '数目',
        key: 'number'
      },
      {
        label: '详情',
        key: 'detail',
        width: 200
        // align: 'left'
      },
      {
        label: '操作',
        key: 'operation'
      }],
      // 树形表格 数据
      treedata: [],
      primary_name: null,
      primaryLst: [],
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
        label: '个性特质',
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
    treeidRaw: {
      type: Number
    },
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
      const temp = {
        name: '',
        detail: '',
        number: '',
        children: []
      }
      this.treedata.forEach((item) => {
        temp.detail = item.detail
        temp.name = item.event
        temp.number = item.number
        item.children.forEach((subitem) => {
          temp.children.push({
            detail: subitem.detail,
            number: subitem.number,
            name: subitem.event
          })
        })
      })
      if (temp.name === '常见疾病') {
        this.dialogFormInfo.diseases = temp
      } else if (temp.name === '药物代谢') {
        this.dialogFormInfo.drug = temp
      } else if (temp.name === '个性特征') {
        this.dialogFormInfo.personality = temp
      }
      const range = await createDataForm(this.dialogFormInfo)
      if (range) {
        this.$message('产品:' + this.dialogFormInfo.product_name + ';创建' + '成功')
        // this.onCancel()
        this.treedata = []
      }
    },
    async updateData() {
      const tempData = Object.assign({}, this.dialogFormInfo)
      const range = await updateDataForm(tempData)
      if (range) {
        this.$message('产品:' + this.dialogFormInfo.product_name + ';更新' + '成功')
        this.onCancel()
        this.treedata = []
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
          } else if (i.drugClass) {
            list.push({
              label: i.drugClass
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
      // 对应二级菜单显示栏
      setTimeout(_ => {
        if (val.indexOf('常见疾病') > -1 && !this.optionPrimary[0].secondary.length) {
          this.optionPrimary[0].secondary = this.querySearchSec('常见疾病')
        } else if (val.indexOf('药物代谢') > -1 && !this.optionPrimary[2].secondary.length) {
          this.optionPrimary[2].secondary = this.querySearchSec('药物代谢')
        } else if (val.indexOf('个性特质') > -1 && !this.optionPrimary[1].secondary.length) {
          this.optionPrimary[1].secondary = this.querySearchSec('个性特质')
        }
      }, 300)
    },
    // 指标搜索框

    async handleValue(val) {
      this.primary_name = val[0]
      this.secondary_name = val[1]
      this.resetTransfer()
      var itemData = []
      if (this.primary_name === '常见疾病') {
        itemData = await gallDisease(this.secondary_name)
      } else if (this.primary_name === '个性特质') {
        itemData = await gallPersonality(this.secondary_name)
      } else if (this.primary_name === '药物代谢') {
        itemData = await gallDrug(this.secondary_name)
      }
      itemData.data.diseases.forEach((item, index) => {
        this.transfer.data.push({
          label: item.indicate_name,
          key: index
        })
      })
    },
    // 重置穿越框数据
    resetTransfer() {
      this.transfer = {
        data: [],
        value: []
      }
    },
    // 从trsander value中获取数据
    handleTransferData(val) {
      const tempIndi = [] // 指标项
      this.transfer.data.forEach((item, index) => {
        if (item.key in this.transfer.value) {
          tempIndi.push(item.label)
        }
      })
      // 父节点初始化
      const parent = {
        id: this.treeid,
        event: this.primary_name,
        number: tempIndi.length,
        detail: this.secondary_name + ':' + tempIndi.length + '项'
      }
      // 子节点初始化
      const children = {
        id: this.treeid,
        event: this.secondary_name, // 二级菜单
        number: tempIndi.length, // 指标数目
        detail: tempIndi.join(',') // 指标项目
      }
      // 根据参数传回去数据结构
      if (val === 'children') {
        return children
      } else {
        parent['children'] = [children]
        return parent
      }
    },
    // 将数据转换成树状表格可接受的数据格式
    handleAddTreeData() {
      this.primaryLst.push(this.primary_name)
      this.treeid++
      // 增加一个父节点
      // 从trsander value中获取数据
      const tempData = this.handleTransferData('parent')
      // 将一个父节点增加到tree数据中
      this.treedata.push(tempData)
      this.resetTransfer()
    },
    // 增加子节点
    addMenuItem(row, type) {
      // 传回穿越框中获取的数据
      const tempData = this.handleTransferData('children')
      // 用于判断是否增加子组件，禁止模块用不了，暂时通过穿越框中的value是否包含数据来判断
      if (tempData.number > 0) {
        this.treeid++
        // 修改父节点值
        row.number = row.number + tempData.number
        row.detail = row.detail + ';' + this.secondary_name + ':' + tempData.number + '项'
        // 增加子节点
        tempData[name] = 'child'
        this.$refs.TreeTable.addChild(row, tempData)
        this.resetTransfer()
      } else {
        console.log('空值无法增加')
      }
    },
    // 删除组件
    deleteItem(row) {
      // 删除子组件是，父组件的值要变化
      if (row._parent) {
        // 减少数目
        row._parent.number = row._parent.number - row.number
        // 修改detail
      // 删除父组件时，重置pramary name，解锁添加父节点按钮
      } else {
        this.primary_name = null
        this.secondary_name = null
      }
      // 使用TreeTbale中的方法来删除组件
      this.$refs.TreeTable.delete(row)
      this.treeid--
    },
    deleteItem_old(row) {
      // 自己写
      // 一级
      for (var i = 0; i < this.treedata.length; i++) {
        // 存在子组件
        if (row.children) {
          if (this.treedata[i].id === row.id) {
            this.treedata.splice(i, 1)
            i--
          }
        } else {
          // 不存在子组件,则遍历子组件（该函数仅适合两级别
          for (var j = 0; j < this.treedata[i].children.length; j++) {
            if (this.treedata[i].children[j].id === row.id) {
              this.treedata[i].children.splice(j, 1)
              j--
            }
          }
        }
      }
    }
  }
}

</script>
<style>
.customWidth {
  width: 60%;
}

</style>

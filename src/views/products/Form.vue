<template>
  <el-dialog :title="textMap[dialogStatus]" :visible="dialogVisible" @close="onCancel" customClass="customWidth">
    <el-form :rules="rules" :model="dialogFormInfo" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item :label="$t('table.product_name')" prop="name">
        <el-autocomplete class="input" v-model="dialogFormInfo.product_name" :fetch-suggestions="querySearchProduct" placeholder="产品名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
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
      <el-form-item :label="$t('table.product_users')" prop="product_users">
        <el-select v-model="dialogFormInfo.users" multiple class="filter-item" placeholder="产品可用权限">
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
      <el-button @click="dialogVisible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
import { getSecondary, gallDisease, getProductName, gallPersonality, gallDrug, createDataForm, updateDataForm } from '@/api/product'
import { glistUser } from '@/api/user/user'
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
      treeid: {},
      /* {
        label: '选择框',
        checkbox: true
      },*/
      treecolumns: [{
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
      treedata: this.treeFormData,
      primary_name: null,
      primaryLst: [],
      secondaryLst: [],
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
        name: [{ required: true, message: '产品名称必填且名称需唯一', trigger: 'focus' }],
        product_class: [{ required: true, message: 'product_class is required', trigger: 'change' }],
        status: [{ required: true, message: 'status is required', trigger: 'blur' }]
      },
      managerOptions: [],
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
    treeFormData: {
      type: Array
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
  created() {
    this.glistUser()
  },
  watch: {
    // prop 传递dialog新建和编辑表格，变量再赋值
    dialogFormVisible(val) {
      this.dialogVisible = val
    },
    // 树表数据，从prop获取的变量 再赋值
    treeFormData(val) {
      this.treedata = val
    },
    // 监控treedata的值，从treedata中获取已经存在的一级分类和二级分类的数组，以及初始化的id值
    treedata: {
      handler(newval) {
        this.primaryLst = []
        this.secondaryLst = []
        for (var i in newval) {
          this.primaryLst.push(newval[i].event)
          for (var j in newval[i].children) {
            this.secondaryLst.push(newval[i].children[j].event)
          }
          this.treeid[newval[i].event] = newval[i].children.length
        }
      },
      deep: true
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    async glistUser() {
      const userinfo = await glistUser()
      userinfo.data.results.forEach(item => {
        this.managerOptions.push(item.name)
      })
    },
    handleSelect(item) {
      console.log(item)
    },
    // 为解决Converting circular structure to JSON问题，再重新存一次数据
    circleJson(obj) {
      var results = []
      for (var i = 0; i < obj.length; i++) {
        const temp = {
          id: obj[i].id,
          detail: obj[i].detail,
          event: obj[i].event,
          number: obj[i].number,
          children: []
        }
        for (var j = 0; j < obj[i].children.length; j++) {
          var item = obj[i].children[j]
          temp.children.push({ id: item.id, detail: item.detail, event: item.event, number: item.number })
        }
        results.push(temp)
      }
      return results
    },
    // 新建数据
    async createData() {
      this.dialogFormInfo.results = JSON.stringify(this.circleJson(this.treedata))
      const range = await createDataForm(this.dialogFormInfo)
      if (range) {
        this.$message('产品:' + this.dialogFormInfo.product_name + ';创建' + '成功')
        this.$emit('getlist')
        this.onCancel()
        this.treedata = []
      }
    },
    // 编辑更新数据
    async updateData() {
      this.dialogFormInfo.results = JSON.stringify(this.circleJson(this.treedata))
      const tempData = Object.assign({}, this.dialogFormInfo)
      const range = await updateDataForm(tempData)
      if (range) {
        this.$message('产品:' + this.dialogFormInfo.product_name + ';更新' + '成功')
        this.$emit('getlist')
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
    createFilter(queryString) {
      return (result) => {
        return (result.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearchProduct(queryString, callback) {
      var list = []
      // 从后台获取到对象数组
      const product_name = this.dialogFormInfo.product_name
      getProductName(String(product_name)).then((response) => {
        // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for (const i of response.data.product) {
          list.push({ value: i })
        }
        list = queryString ? list.filter(this.createFilter(queryString)) : list
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
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
      var tempIndi = [] // 指标项
      for (var i in this.transfer.value) { // 遍历右边转移框
        const val_idx = this.transfer.value[i] // 取值，作为总数据的idx
        tempIndi.push(this.transfer.data[val_idx].label)
      }
      // 父节点初始化
      var parent = {
        id: '展开/折叠',
        event: this.primary_name,
        number: tempIndi.length,
        detail: this.secondary_name + ':' + tempIndi.length + '项',
        children: []
      }
      // 子节点初始化
      var child = {
        id: this.treeid[this.primary_name],
        event: this.secondary_name, // 二级菜单
        number: tempIndi.length, // 指标数目
        detail: tempIndi.join(',') // 指标项目
      }
      // 根据参数传回去数据结构
      if (val === 'children') {
        return child
      } else {
        parent.children.push(child)
        return parent
      }
    },
    // 将数据转换成树状表格可接受的数据格式
    handleAddTreeData() {
      // 增加一个父节点
      // 从trsander value中获取数据
      var tempData = this.handleTransferData('parent')
      // 将一个父节点增加到tree数据中
      this.treedata.push(tempData)
      this.resetTransfer()
    },
    // 增加子节点
    addMenuItem(row, type) {
      // 传回穿越框中获取的数据
      var tempData = this.handleTransferData('children')
      // 用于判断是否增加子组件，禁止模块用不了，暂时通过穿越框中的value是否包含数据来判断
      if (tempData.number > 0 && row.event === this.primary_name) {
        // 修改父节点值
        row.number = row.number + tempData.number
        row.detail = row.detail + ';' + this.secondary_name + ':' + tempData.number + '项'
        // 增加子节点
        tempData.name = 'child'
        this.$refs.TreeTable.addChild(row, tempData)
        this.resetTransfer()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '该指标与一级分类不相符',
          type: 'warning'
        })
      }
    },
    // 删除组件
    deleteItem(row) {
      // 使用TreeTbale中的方法来删除组件
      this.$refs.TreeTable.delete(row)
      // 删除子组件时，父组件的值的变化
      if (row._parent) {
        // 父组件减少数目
        row._parent.number = row._parent.number - row.number
        // 删除子组件时，父组件的详情同步变动减少
        var detailLst = row._parent.detail.split(';')
        for (var i = 0; i < detailLst.length; i++) {
          if (i === row.id) {
            detailLst.splice(i, 1)
            i--
          }
        }
        row._parent.detail = detailLst.join(';')
        // 减少其他
        this.treeid[row._parent.event]--
      // 删除父组件时，重置pramary name，解锁添加父节点按钮
      } else {
        this.primary_name = null
        this.secondary_name = null
      }
    }
  }
}

</script>
<style>
.customWidth {
  width: 80%;
}

</style>

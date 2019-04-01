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
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleAddSnps">{{ $t('table.addsnps') }}</el-button>
    <!--位点表单-->

    <el-form :model="siteForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;" v-if="showValueForm">
      <el-form-item :label="$t('table.snp_name')" prop="name">
        <el-autocomplete class="input" v-model="siteForm.rs_name" :fetch-suggestions="querySearchIndi" placeholder="新增位点" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.gene')" prop="name">
        <el-input placeholder="请输入内容" v-model="siteForm.gene" clearable> </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.effect_allele')" prop="effect_allele">
        <el-col :span="12">
          <el-select v-model="siteForm.effect_allele" class="filter-item" placeholder="Please select">
            <el-option v-for="item in basesTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('table.other_allele')" prop="other_allele">
        <el-col :span="12">
          <el-select v-model="siteForm.other_allele" class="filter-item" placeholder="Please select">
            <el-option v-for="item in basesTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('table.jb_or')" prop="jb_or">
        <el-input placeholder="请输入OR值" v-model="siteForm.jb_or" clearable> </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.homeRefFrequency')" prop="homeRefFrequency">
        <el-input placeholder="请输入HOM Ref 频率值" v-model="siteForm.homeRefFrequency" clearable> </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.hetFrequency')" prop="hetFrequency">
        <el-input placeholder="请输入Het Freq值" v-model="siteForm.hetFrequency" clearable> </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.homAltFrequency')" prop="homAltFrequency">
        <el-input placeholder="请输入Hom Alt Freq值" v-model="siteForm.homAltFrequency" clearable> </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.reference')" prop="reference">
        <el-input placeholder="请输入参考文献" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="siteForm.reference" clearable> </el-input>
      </el-form-item>
      <el-button @click="onCancelSnp">关闭新增</el-button>
      <el-button type="primary" @click="handleCreateSnps">确定新增</el-button>
    </el-form>
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
import { getPrimary, getSecondary, getDisease, glistKnowlege, createDataForm, updateDataForm } from '@/api/interpretation'
import inEditTable from './../inEditTable'

export default {
  components: { inEditTable },
  data() {
    return {
      textMap: {
        update: '编辑',
        create: '新建'
      },
      siteForm: {},
      indicateForm: this.dialogFormInfo,
      columns: [{
        label: '位点rs号',
        key: 'rs_name'
      },
      {
        label: 'Gene',
        key: 'gene'
      },
      {
        label: 'EffectAllele',
        key: 'effect_allele'
      },
      {
        label: '次要allele',
        key: 'other_allele'
      },
      {
        label: 'OR值',
        key: 'jb_or'
      },
      {
        label: 'Beta',
        key: 'beta'
      },
      {
        label: 'CI值',
        key: 'CI'
      },
      {
        label: 'Pvalue',
        key: 'p_value'
      },
      {
        label: 'HomRef频率',
        key: 'homeRefFrequency'
      },
      {
        label: 'Het频率',
        key: 'hetFrequency'
      },
      {
        label: 'HomAlt频率',
        key: 'homAltFrequency'
      },
      {
        label: '文献',
        key: 'reference'
      },
      {
        label: '操作',
        key: 'operation'
      }
      ],
      sites: {},
      listLoading: false,
      showValueForm: false,
      siteid: 0,
      state1: '',
      dialogVisible: this.dialogFormVisible,
      explainList: this.inEditForm,
      basesTypeOptions: ['A', 'T', 'C', 'G']
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
    onCancelSnp() {
      this.showValueForm = false
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
      const primary_name = this.indicateForm.primary_name
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
      const secondary_name = this.indicateForm.secondary_name
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
    // 知识库
    querySearchKlg(queryString, callback) {
      var list = []
      const primary_name = this.indicateForm.primary_name
      const knowledge_name = this.inEditForm.knowledge_name
      glistKnowlege(primary_name, knowledge_name).then((response) => {
        console.log(response.data)
        for (const i of response.data.result) {
          if (i) {
            list.push({ value: i })
          }
        }
        list = queryString ? list.filter(this.createFilter(queryString)) : list
        callback(list)
      })
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
    handleAddSnps() {
      this.showValueForm = true
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
      createDataForm(JSON.stringify(this.indicateForm)).then(() => {
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
      const tempData = Object.assign({}, this.indicateForm) // 从row 中赋值到data
      tempData.results = JSON.stringify(this.explainList) // 转回去的是results值，需要重新赋值
      this.showValueForm = false // 重置新增位点页面
      updateDataForm(JSON.stringify(tempData)).then(() => {
        this.dialogVisible = false
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

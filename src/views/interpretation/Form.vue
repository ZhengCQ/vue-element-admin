<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="textMap[dialogStatus]" :visible="dialogFormVisible" @close="onCancel">
    <el-form :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item :label="$t('table.primary_name')" prop="name">
        <el-autocomplete class="input" v-model="temp.primary_name" :fetch-suggestions="querySearchPri" placeholder="请点击选择一级分类" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.secondary_name')" prop="name">
        <el-autocomplete class="input" v-model="temp.secondary_name" :fetch-suggestions="querySearchSec" placeholder="请点击选择二级分类" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.disease_name')" prop="name">
        <el-autocomplete class="input" v-model="temp.disease_name" :fetch-suggestions="querySearchIndi" placeholder="点击获取指标名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('table.indicate_name')" prop="name">
        <el-input v-model="temp.disease_name" placeholder="请输入指标名称"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.knowledge_name')" prop="name">
        <el-autocomplete class="input" v-model="temp.knowledge_name" :fetch-suggestions="querySearchKlg" placeholder="关联知识库" @select="handleSelect"></el-autocomplete>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
  <!--新增编辑表单 结束-->
</template>
<script type="text/javascript">
import { getPrimary, getSecondary, getDisease, createDataForm, updateDataForm } from '@/api/interpretation'
import waves from '@/directive/waves' // Waves directive

export default {
  directives: { waves },
  props: {
    dialogStatus: {
      type: String
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    temp: {
      type: Object
    }
  },
  data() {
    return {
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      state1: ''
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
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
      const name = this.temp.primary_name
      getSecondary(String(name)).then((response) => {
        // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for (const i of response.data.secondary) {
          i.value = i.name // 将想要展示的数据作为value
        }
        list = response.data.secondary
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    querySearchIndi(queryString, callback) {
      var list = [{}]
      // 从后台获取到对象数组
      const name = this.temp.secondary_name
      getDisease(String(name)).then((response) => {
        // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        for (const i of response.data.diseases) {
          i.value = i.disease_name // 将想要展示的数据作为value
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
    querySearchKlg(queryString, callback) {},
    handleSelect(item) {
      console.log(item)
    },
    createData() {
      createDataForm(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      console.log(tempData)
      updateDataForm(tempData).then(() => {
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}

</script>

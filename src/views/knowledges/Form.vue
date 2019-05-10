<template>
  <!--新增编辑表单 开始-->
  <el-dialog :title="textMap[dialogStatus]" :visible="dialogVisible" @close="onCancel" customClass="customWidth">
    <el-form :model="dialogFormInfo" label-position="left" label-width="100px" style="width: 800px; margin-left:50px;">
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="dialogFormInfo.knowledge_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" label-width="120px">
        <tinymce :value="dialogFormInfo.richTextFormatContent" v-model="dialogFormInfo.richTextFormatContent"/>
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
import Tinymce from '@/components/Tinymce'
// import { paddKnowlege, peditKnowlege } from '@/api/knowledges'

export default {
  components: { Tinymce },
  data() {
    return {
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogVisible: this.dialogFormVisible
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
    paddKnowlege: {
      type: Function,
      default: null
    },
    peditKnowlege: {
      default: null
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
    async createData() {
      console.log(this.dialogFormInfo)
      const range = await this.paddKnowlege(this.dialogFormInfo)
      if (range) {
        this.$message('素材:' + this.dialogFormInfo.knowledge_name + ';创建' + '成功')
        this.onCancel()
      }
    },
    async updateData() {
      console.log(this.dialogFormInfo)
      const tempData = Object.assign({}, this.dialogFormInfo)
      const range = await this.peditKnowlege(tempData)
      if (range) {
        this.$message('素材:' + this.dialogFormInfo.knowledge_name + ';更新' + '成功')
        this.onCancel()
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

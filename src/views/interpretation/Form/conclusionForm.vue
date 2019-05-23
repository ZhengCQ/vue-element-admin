<template>
  <div>
    <el-form :inline="true" :model="FormInfo" :rules="rules" label-position="left" style="width: 600px;margin-left:50px;" v-if="showForm">
      <el-row>
        <form-generator :config="config" v-model="FormInfo" :rules="rules" />
      </el-row>
    </el-form>
    <el-form style="width: 600px;margin-left:50px;" v-if="showForm">
      <el-form-item label="风险图片" label-width="70px">
        <el-upload class="uploader" action :show-file-list="false" :on-success="handleLogoUploadSuccess" :http-request="customUpload">
          <img
             v-if="FormInfo.image_path"
             :src="FormInfo.image_path"
             class="upload">
          <i
             v-else
             class="el-icon-plus uploader-icon" />
        </el-upload>
    </el-form-item>
    <el-button
              class="el-button el-button--primary el-button--mini clipboard-btn"
              size="small"
              v-clipboard:copy="FormInfo.image_path"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              >
            复制链接
    </el-button>

    <el-form-item :label="$t('table.explanation')" prop="explanation">
      <el-input placeholder="结论说明和概况" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.explanation" clearable> </el-input>
    </el-form-item>
    <el-form-item :label="$t('table.interpretation')" prop="interpretation">
      <el-input placeholder="结论的详细解读及建议概述" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.interpretation_details" clearable> </el-input>
    </el-form-item>
    <el-form-item :label="$t('table.suggestion')" prop="suggestion">
      <el-input placeholder="详细的建议对策" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="FormInfo.suggest" clearable> </el-input>
    </el-form-item>
     <slot></slot>
  </el-form>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
import FormGenerator from '@/components/Form/FormGenerator'
export default {
  name: 'ConclusionForm',
  components: { FormGenerator },
  inject: ['InterpMainApp'], // 从Main.vue中获取数据
  data() {
    return {
      config: this.InterpMainApp.conclusionConfig,
      FormInfo: this.InterpMainApp.conclusionFormInfo,
      rules: this.InterpMainApp.rules,
      UploadBaseURL: this.COMMON.baseUrl + this.COMMON.api_upload,
      imgsrc: ''
    }
  },
  props: {
    showForm: {
      type: Boolean
    },
    FormData: {
      type: Object
    }
  },
  computed: {
    riskimage() {
      return this.FormInfo.riskimage
    }
  },
  watch: {
    FormData(val) {
      var keys = ['conclusion', 'evaluation_indicator', 'explanation', 'image_path', 'indicate_id', 'interpretation_details', 'suggest', 'id']
      keys.forEach(key => {
        this.FormInfo[key] = val[key]
      })
    },
    riskimage(newValue) {
      if (this.riskimage !== null) {
        var imge_abs_path = this.COMMON.webUrl + '/' + newValue + '/' + this.FormInfo.conclusion_sel[1]
        imge_abs_path = imge_abs_path + '.jpg' // 需要判断远程是jpg或者是png
        this.$set(this.FormInfo, 'image_path', imge_abs_path)
      }
    }
  },
  methods: {
    onCopy(e) {
      alert('拷贝图片链接: ' + e.text)
    },
    onError(e) {
      alert('拷贝链接失败')
    },
    handleLogoUploadSuccess(response, file, fileList) {
      console.log('Upload response is %o', response)
      this.$set(this.FormInfo, 'image_path', this.COMMON.webUrl + '/' + response.response_url)
    },
    uploadFile(file, formData) {
      return new Promise((resolve, reject) => {
        return axios.post(this.UploadBaseURL, formData).then(({ data }) => {
          if (!data || typeof data.response_url !== 'string') {
            reject('Invalid JSON')
            return
          }
          resolve(data)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    customUpload(options) {
      try {
        const formData = new FormData()
        formData.append('file', options.file)

        if (options.data) {
          Object.keys(options.data).forEach(key => {
            formData.append(key, options.data[key])
          })
        }
        return this.uploadFile(options.file, formData)
      } catch (e) {
        console.error(e)
        this.$message('error', e.message || '未知上传错误')
      }
    }
  }
}
</script>

<style lang="scss">
.el-input,
.el-select,
.el-textarea {
  width: 300px;
}

.uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409eff;
  }

  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }

  .upload {
    width: 220px;
    height: 200px;
    border-radius: 1px;
    display: block;
  }
}

.el-upload:hover {
  border-color: #409eff;
}
</style>

<script type="text/javascript">
// 定义一些公共的属性和方法
const isPro = Object.is(process.env.NODE_ENV, 'production')
// const baseUrl = isPro ? 'http://47.100.178.254:7000' : 'http://127.0.0.1:7000'
const baseUrl = isPro ? 'http://47.100.178.254:7000' : 'http://47.100.178.254:7000'
const api_upload = '/disease/upload_image' // 上传的API
const webUrl = 'http://47.100.178.254:443' // 上传后的地址
// const webUrl = 'http://localhost:7000' // 上传后的地址

// 暴露出这些属性和方法
export default {
  baseUrl,
  api_upload,
  webUrl
}
</script>

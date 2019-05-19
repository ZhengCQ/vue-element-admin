const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    // baseUrl: isPro ? 'http://47.100.178.254:7000' : 'http://localhost:5000',
    baseUrl: isPro ? 'http://47.100.178.254:7000' : 'http://47.100.178.254:7000',//API地址
    api_upload: '/disease/upload_image',// 上传的API
    webUrl: 'http://47.100.178.254:443' //上传后的地址
}
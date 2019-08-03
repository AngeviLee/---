//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgPath: '/uploads/boy.jpg'
  },
  // 定义一个方法
  selectImage: function () {
    var _this = this;
    // 打开一张图片，小程序中API多为异步的
    wx.chooseImage({
      // 打开图片的结果，通过success回调获取
      success: function(res) {
        // 图片来源
        sourceType: ['album', 'camera'],
        // console.log(res.tempFiles[0].path);
        // 预览图片
        _this.setData({
          imgPath: res.tempFiles[0].path
        });
        // 2.发送这张图片，wx.uploadFile
        wx.uploadFile({
          url: 'https://ai.qq.com/cgi-bin/appdemo_detectface',
          filePath: res.tempFiles[0].path,
          name: 'image_file',
          success: function(info) {
            // 3.后盾解析图片，然后响应结果，小程序展示结果
            // console.log(info.data)
            // 将json字符串处理javascript的对象或数组
            var data = JSON.parse(info.data);
            // console.log(data.data.face[0]);
            // _this.setData();
            _this.setData({
              face: data.data.face[0]
            });
          }
        })
      }
    });
  }
})

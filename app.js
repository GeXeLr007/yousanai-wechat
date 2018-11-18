//app.js
App({
  serverUrl:"https://gxl.mynatapp.cc",
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData:{
    userInfo:null,//使用小程序获取用户信息接口获得的
    openId:null,
    userInfoBack: null   //登录操作从后端系统返回的
  }
})
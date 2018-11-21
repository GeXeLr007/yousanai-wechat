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
    //userInfoBack: null   //登录操作从后端系统返回的，改为存储在微信缓存中
  },
  goLoginPage:function(res){
    if (res.data.status == 500210) {
      wx.redirectTo({
        url: '../userLogin/login',
      })
      return true;
    }else{
      return false;
    }
  }
})
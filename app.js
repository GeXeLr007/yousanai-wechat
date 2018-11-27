//app.js
App({
  serverUrl: "https://gxl.mynatapp.cc",
  onLaunch: function() {
    var that = this
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //调用login接口获取用户的code
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.serverUrl+'/user/openId',
            data: {
              code: res.code
            },
            success:function(res){
              console.log(res.data.data)
              wx.setStorageSync('openId', res.data.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    //调用getUserInfo接口获取用户信息，供给注册功能使用
    wx.getUserInfo({
      success: function (res) {
        wx.setStorageSync('userInfo', res.userInfo )
      }
    })

  },
  globalData: {
    userInfo: null, //使用小程序获取用户信息接口获得的
  },
  goLoginPage: function(res) {
    if (res.data.status == 500210) {
      wx.redirectTo({
        url: '../userLogin/login',
      })
      return true;
    } else {
      return false;
    }
  },
  needLoginRequest: function(url, data, func) {
    var that = this
    if (!url.endsWith('insertOrUpdateUserCourseSection')){
      wx.showLoading({
        title: '请稍等',
      })
    }
    wx.request({
      url: this.serverUrl + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      data: data,
      success: function(res) {
        console.log(res.data)
        if (!url.endsWith('insertOrUpdateUserCourseSection')) {
          wx.hideLoading()
        }
        if (!that.goLoginPage(res)) {
          func(res)
        }
      }
    })
  }

})
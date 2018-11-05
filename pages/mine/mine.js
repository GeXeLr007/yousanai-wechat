//mime.js
var util = require('../../utils/util.js')
var uri = 'memberapi/memberDetail'
var app = getApp()
var serverUrl = app.serverUrl;
var Info = {}
Page({
  data: {
    userInfo: null
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
  },
  no_payment: function () {
    //全部订单
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({
        url: '../login/login?id=' + 0
      })
    }
    wx.navigateTo({
      url: '../ordertotal/ordertotal?id=' + 0

    })
  },
  already_shipped: function () {
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({
        url: '../login/login?id=' + 1
      })
    }
    //待付款
    wx.navigateTo({
      url: '../ordertotal/ordertotal?id=' + 1
    })
  },
  no_comment: function () {
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({
        url: '../login/login?id=' + 2
      })
    }
    //待收货
    wx.navigateTo({
      url: '../ordertotal/ordertotal?id=' + 2
    })
  },
  //售后
  customer_service: function () {
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({   //加个参数  
        url: '../login/login?id=' + 3
      })
    } else {
      wx.navigateTo({   //加个参数  
        url: '../service/service'
      })
    }
  },
  coupon: function () {
    //优惠券
    wx.navigateTo({   //加个参数  
      url: '../coupon/coupon'
    })
  },
  //账户管理
  mimeinfo: function () {
    wx.navigateTo({
      url: '../userLogin/login'
    })
  },
  onShow: function () {
    var that = this;
    if (!that.data.userInfo) {
      wx.getUserInfo({
        success: function (res) {
          app.globalData.userInfo = res.userInfo;
          that.setData({
            userInfo: res.userInfo
          })
        }
      });
    }
    
    if(!app.globalData.openId){
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: serverUrl + '/user/openId',
              data: {
                code: res.code
              },
              success: function (res) {
                var openId = res.data.data;
                app.globalData.openId = openId;
                console.log(openId);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
})
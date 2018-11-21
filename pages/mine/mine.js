//mime.js
var util = require('../../utils/util.js')
var uri = 'memberapi/memberDetail'
var app = getApp()
var serverUrl = app.serverUrl;

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //检查有没有使用权限
  },
  onShow: function() {
    this.setData({
      loginUser: wx.getStorageSync("loginUser")
    })
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {

            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  },
  changeToLogin: function() {
    wx.navigateTo({
      url: '../userLogin/login',
    })
  },
  logout: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定注销吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: serverUrl + '/user/logout',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': wx.getStorageSync("sessionid") //读取cookie
            },
            data: {},
            success: function(res) {
              console.log(res.data)
              app.goLoginPage(res)
              wx.clearStorageSync('loginUser')
              that.setData({
                loginUser: wx.getStorageSync("loginUser")
              })
              wx.showToast({
                title: '注销成功',
              })
            }
          })
        }
      }
    })
  }
})
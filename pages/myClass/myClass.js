//获取应用实例
const app = getApp()
var serverUrl = app.serverUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['最近学习', '我的收藏'],
    currentTab: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: serverUrl + '/user/course',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      data: {},
      success: function(res) {
        console.log(res.data)
        if (!app.goLoginPage(res)){
          that.getCollection()
          var courses = res.data.data
          that.setData({
            courses: courses
          })
        }
      }
    })
    
  },
  getCollection: function() {
    var that = this
    wx.request({
      url: serverUrl + '/user/collect',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      data: {},
      success: function(res) {
        console.log(res.data)
        app.goLoginPage(res)
        var collections = res.data.data
        that.setData({
          collections: collections
        })
      }
    })
  },
  navbarTap: function(e) {
    console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  cancelCollection: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定不再收藏了吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: serverUrl + '/collections/doCollection',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': wx.getStorageSync("sessionid") //读取cookie
            },
            data: {
              courseId: e.currentTarget.dataset.courseId
            },
            success: function(res) {
              console.log(res.data)
              app.goLoginPage(res)
              that.getCollection()
              var title = res.data.data == 1 ? '收藏成功' : '取消收藏成功'
              wx.showToast({
                title: title,
              })
            }
          })
        }
      }
    })
  }
})
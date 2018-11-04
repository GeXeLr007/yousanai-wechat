//signup.js
//获取应用实例
const app = getApp()
Page({
  data: {
    signupimg: '../../image/signup.png',            
    
    OneClassUrls: [],
    freeUrls:[],
    iconsrc: '../../image/usercount.png',
  },
  onLoad: function () {
    var that = this;
    var page = that.data.page;
    that.getOneClassUrlsList(page);
    that.getfreeUrlsList(page);
  },
  getOneClassUrlsList: function (page) {
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/courseList/listOne',
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var OneClassUrls = res.data.data;
        var newOneClassUrls = that.data.OneClassUrls;
        that.setData({
          OneClassUrls: newOneClassUrls.concat(OneClassUrls),
          serverUrl: serverUrl
        });
      }
    })
  },
  
  getfreeUrlsList: function (page) {
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/course/listTwo',
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var freeUrls = res.data.data;
        var newFreeUrls = that.data.freeUrls;
        that.setData({
          freeUrls: newFreeUrls.concat(freeUrls),
          serverUrl: serverUrl
        });
      }
    })
  },

})


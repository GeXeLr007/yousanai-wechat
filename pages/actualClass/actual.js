//signup.js
//获取应用实例
const app = getApp()
Page({
  data: {
    signupimg: '../../image/signup.png',
    actualUrls: [],
    iconsrc: '../../image/usercount.png',
  },
  onLoad: function () {
    var that = this;
    var page = that.data.page;
    that.getfreeUrlsList(page);
  },
  getfreeUrlsList: function (page) {
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/actual/class',
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var actualUrls = res.data.data;
        var newActualUrls = that.data.actualUrls;
        that.setData({
          actualUrls: newActualUrls.concat(actualUrls),
          serverUrl: serverUrl
        });
      }
    })
  },

})

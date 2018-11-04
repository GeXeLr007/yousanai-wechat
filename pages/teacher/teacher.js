var app = getApp()
Page({
  data:{
    trimg: [],
  },
  onLoad:function(res){
    var that = this;
    var page = that.data.page;
    var serverUrl = app.serverUrl;
    var teacherId = res.teacherId;
    console.log(res);
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/teacher/'+ teacherId,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res);
        var trimg = res.data.data;
        var newtrimg = that.data.trimg;
        that.setData({
          trimg: newtrimg.concat(trimg),
          serverUrl: serverUrl
        });
      }
    });
  }



})
const app = getApp()
Page({
  onShow: function(options) {
    var myInfo = wx.getStorageSync('loginUser');
    this.setData({
      myInfo: myInfo
    })
    if(!myInfo){
      wx.redirectTo({
        url: '../userLogin/login',
      })
    }
    
  },
  goEditMyInfo:function(){
    wx.navigateTo({
      url: '../editMyInfo/editMyInfo',
    })
  }
  
})
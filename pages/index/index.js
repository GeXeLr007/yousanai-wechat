//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    a1src:'http://dulpyhb.oss-cn-beijing.aliyuncs.com/dulp/icon/course/news0grid.png%21120x120.png',
    a2src: 'http://dulpyhb.oss-cn-beijing.aliyuncs.com/dulp/icon/course/kecheng.png%21120x120.png',
    a3src: 'http://dulpyhb.oss-cn-beijing.aliyuncs.com/dulp/icon/course/4.png',
    a4src: 'http://dulpyhb.oss-cn-beijing.aliyuncs.com/dulp/icon/course/3.png',
    signupimg:'../../image/钱.png',
    imgsrc:'http://pfnhwx1sm.bkt.clouddn.com/yousanai.png',
    iconsrc:'../../image/usercount.png',
    jtsrc:'../../image/icon-jt.png',
    trimg: [],
    advpicture:'http://dulpyhb.oss-cn-beijing.aliyuncs.com/dulp/courseImage/ImageBasic/tisadv.png',
    imgUrls: [],
    DeepLearninginclude:'深度学习(Deep Learning) 是以神'+
    '经网络和大数据为基础的机器学习应用科学在图像处理，语音识别，自然语言处理领域被广泛使用，本课程以计算机视觉为背景，系统性讲解深度学习理论和实战知识...',
    freeUrls:[],
    actualUrls:[],
    recommond:[],
    warnSize: 'default',
    loading: false,
    plain: false,
    disabled: false,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 
  }
  ,onLoad:function(params){
    var that = this;
    var page = that.data.page;
    that.getImgUrlsList(page);
    that.getFreeUrlsList(page);
    that.getActualUrlsList(page);
    that.getTeacherUrlsList(page);
    that.getRecommond(page);
  },
  getRecommond:function(page){
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/index/recommond',
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var recommond = res.data.data;
        var newrecommond = that.data.recommond;
        that.setData({
          recommond: newrecommond.concat(recommond),
          serverUrl: serverUrl
        });
      }
    })
  },
  getTeacherUrlsList: function (page) {
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/index/RTchrList',
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var trimg = res.data.data;
        var newTrimg = that.data.trimg;
        that.setData({
          trimg: newTrimg.concat(trimg),
          serverUrl: serverUrl
        });
      }
    })
  },
  getFreeUrlsList:function(page){
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl+'/index/free',
      method: "POST",
      success:function(res){
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
  getImgUrlsList:function(page){
    var that = this;
    var serverUrl =app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl+'/index/info',
      method: "POST",
      success:function(res){
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var imgUrls = res.data.data;
        var newImgUrls = that.data.imgUrls;
        that.setData({
          imgUrls: newImgUrls.concat(imgUrls),
          serverUrl:serverUrl
        });
      }
    })
  }, 
  getActualUrlsList: function (page) {
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/index/actual',
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '有三AISchool',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        onsole.log("转发失败")
      }
    }
  }
})

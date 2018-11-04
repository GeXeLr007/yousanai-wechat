//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    signupimg: '../../image/播放.png',
    navbar: ['章节','详情'],
    currentTab: 0,
    classMsg: [],
    learnClass: [],
    learnTcher: [],
    learnClassRd: [],
    teacherHeader: 'http://dulpyhb.oss-cn-beijing.a'
      + 'liyuncs.com/dulp/teacherImage/yousan/teacher001.png',
    haibao: 'http://dulpyhb.oss-cn-beijing.aliyuncs.com/dulp/courseImage/ImageBasic/haibao.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var page = that.data.page;
    var serverUrl = app.serverUrl;
    var classId = options.classId;
    activeCategoryId: 0,
    wx.showLoading({
      title: 'Loading...',
    });
    wx.request({
      url: serverUrl + '/course/learn/' + classId,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var classMsg = res.data.data;
        var newClassMsg = that.data.classMsg;
        that.setData({
          classMsg: newClassMsg.concat(classMsg),
          serverUrl: serverUrl
        });
      }
    });
    wx.request({
      url: serverUrl + '/course/learn/class/'+ classId,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var learnClass = res.data.data;
        var newlearnClass = that.data.learnClass;
        that.setData({
          learnClass: newlearnClass.concat(learnClass),
          serverUrl: serverUrl
        });
      }
    })
    wx.request({
      url: serverUrl + '/course/learn/tcher/' + classId,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var learnTcher = res.data.data;
        var newlearnTcher = that.data.learnTcher;
        that.setData({
          learnTcher: newlearnTcher.concat(learnTcher),
          serverUrl: serverUrl
        });
      }
    })
    wx.request({
      url: serverUrl + '/course/learn/classRd/' + classId,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        console.log(res.data.data);
        var learnClassRd = res.data.data;
        var newlearnClassRd = that.data.learnClassRd;
        that.setData({
          learnClassRd: newlearnClassRd.concat(learnClassRd),
          serverUrl: serverUrl
        });
      }
    })
    that.setData({
      src:'',
      direction:''
    })
  },
  navbarTap: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  chooseVideo: function (res) {
    console.log(res);
    
    var src = res.currentTarget.dataset.name;
    var that = this;
    
    that.setData({
      src: src
    })
  }
})
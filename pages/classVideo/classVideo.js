//获取应用实例
const app = getApp()
var serverUrl = app.serverUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    signupimg: '../../image/播放.png',
    navbar: ['章节', '详情'],
    currentTab: 0,
    classMsg: [],
    learnClass: [],
    learnTcher: [],
    learnClassRd: [],
    teacherHeader: 'http://dulpyhb.oss-cn-beijing.a' +
      'liyuncs.com/dulp/teacherImage/yousan/teacher001.png',
    haibao: 'http://dulpyhb.oss-cn-beijing.aliyuncs.com/dulp/courseImage/ImageBasic/haibao.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;
    var page = that.data.page;
    var serverUrl = app.serverUrl;
    var classId = options.classId;
    that.setData({
      classId: classId
    })
    activeCategoryId: 0,
      wx.showLoading({
        title: 'Loading...',
      });
    wx.request({
      url: serverUrl + '/course/learn/' + classId,
      method: "POST",
      success: function(res) {
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
      url: serverUrl + '/course/learn/class/' + classId,
      method: "POST",
      success: function(res) {
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
      success: function(res) {
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
      success: function(res) {
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
      src: '',
      direction: ''
    })
    app.needLoginRequest("/collections/isCollection", {
      courseId: classId
    }, function(res) {
      var collectSrc = res.data.data == 1 ? "../../image/collectBlack.png" : "../../image/collect.png"
      that.setData({
        collectSrc: collectSrc
      })
    })
  },
  navbarTap: function(e) {
    console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  chooseVideo: function(res) {
    console.log(res);
    wx.setStorageSync("currentTime", 0)
    var that = this;
    var section = res.currentTarget.dataset.section
    app.needLoginRequest("/course/insertOrUpdateUserCourseSection", {
      courseId: section.courseId,
      sectionId: section.id
    }, function(res) {
      that.setData({
        rate: res.data.data,
        src: section.videoUrl,
        section: section
      })
    })

  },
  ontimeupdate: function(e) {
    var that = this
    var cur = e.detail.currentTime;
    var section = that.data.section
    var last = wx.getStorageSync("currentTime")
    if (Math.abs(cur - last) > 3) {
      wx.setStorageSync("currentTime", cur)
      console.log(e.detail.currentTime)
      app.needLoginRequest('/course/insertOrUpdateUserCourseSection', {
        courseId: section.courseId,
        sectionId: section.id,
        currentTime: cur
      }, function (res) {
      })
    }
  },
  onended: function() {
    var section = this.data.section
    app.needLoginRequest('/course/endUserCourseSection', {
      courseId: section.courseId,
      sectionId: section.id,
    }, function (res) {

    })
    
  },

  doCollection: function(e) {
    var that = this
    app.needLoginRequest('/collections/doCollection', {
      courseId: that.data.classId
    }, function (res) {
      var title = res.data.data == 1 ? '收藏成功' : '取消收藏成功'
      var collectSrc = res.data.data == 1 ? "../../image/collectBlack.png" : "../../image/collect.png"
      that.setData({
        collectSrc: collectSrc
      })
      wx.showToast({
        title: title,
      })
    })
    
  }
})
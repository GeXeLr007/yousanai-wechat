const app = getApp()
Page({
  onShow: function(options) {
    var loginUser = wx.getStorageSync("loginUser");
    this.setData({
      loginUser: loginUser
    })
    if (!loginUser) {
      wx.redirectTo({
        url: '../userLogin/login',
      })
    }
  },
  formSubmit: function(e) { //提交数据
    var value = e.detail.value;
    var bool = this.checkUsername(value) && this.checkEmail(value) && this.checkMobile(value);
    if (bool) { //验证都为真的话 那么验证通过
      app.needLoginRequest('/user/updateUserInfo', {
        username: value.username,
        mobile: value.mobile,
        mail: value.mail
      }, function(res) {
        if (res.data.status != 200) {
          wx.showToast({
            title: res.data.msg,
          })
        } else {
          wx.setStorageSync('loginUser', res.data.data)
          wx.showToast({
            title: '修改成功',
          })
        }
      })
    }
  },
  checkUsername: function(data) { // 验证昵称
    var username = data.username; // 获取提交的昵称
    if (!username || username.trim() == "") {
      wx.showToast({
        title: '用户名不能为空',
      })
      return false;
    }
    var bool = true
    app.needLoginRequest('/user/checkUsernameUpdate', {
      username: username
    }, function(res) {
      if (res.data.status != 200) {
        bool = false
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
    return bool;
  },
  checkEmail: function(data) { // 验证
    var mail = data.mail;
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!reg.test(mail)) {
      wx.showToast({
        title: 'E-mail格式不正确',
      })
      return false;
    }
    return true;
  },
  checkMobile: function(data) {
    var mobile = data.mobile
    var reg = /^1[3-578]\d{9}$/
    if (!reg.test(mobile)) {
      wx.showToast({
        title: '手机号格式不正确',
      })
      return false;
    }
    return true;
  }
})
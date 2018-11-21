const app = getApp();
Page({
  data: {

  },
  doLogin: function(e) {
    const formObject = e.detail.value;
    const username = formObject.username;
    const password = formObject.password;
    //
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '小老弟~用户名或密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      const serverUrl = app.serverUrl;
      wx.showLoading({
        title: '网速有点慢，请稍等~',
      })
      wx.request({
        url: serverUrl + '/user/login',
        data: {
          username: username,
          password: password
        },
        success: function(res) {
          console.log(res.data);
          wx.hideLoading();
          const status = res.data.status;
          if (status == 200) {
            wx.setStorageSync("loginUser", res.data.data)
            wx.setStorageSync("sessionid", res.header["Set-Cookie"])
            var time = 1000
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: time,
            });
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/mine/mine',
              });
            }, time)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
        }

      })
    }
  },
  goRegistPage: function() {
    wx.navigateTo({
      url: '../userRegist/regist',
    })
  },
})
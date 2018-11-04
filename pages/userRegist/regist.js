const app = getApp()

Page({
    data: {
      
    },
  doRegist:function(e){
      const formObject = e.detail.value;
    const realname = formObject.realname;
    const password = formObject.password;
      //
    if (realname.length==0 || password.length == 0){
        wx.showToast({
          title: '小老弟~用户名或密码不能为空',
          icon:'none',
          duration:3000
        })
      }else{
        const serverUrl = app.serverUrl;
        wx.showLoading({
          title: '网速有点慢，请稍等~',
        })
        wx.request({
          url: serverUrl+'/regist',
          method:"POST",
          data:{
            realname: realname,
            password:password
          },
          header:{
            'content-type':'application/json'
          },
          success:function(res){
            console.log(res.data);
            const status = res.data.status;
            wx.hideLoading();
            if(status == 200){
              wx.showToast({
                title: '小老弟恭喜你注册成功了~',
                icon:'none',
                duration:3000
              }),
              app.userInfo = res.data.data;
              wx.navigateTo({
                url: '../userLogin/login',
              })
            }else if(status == 500){
                wx.showToast({
                  title: res.data.msg,
                  icon:'none',
                  duration:3000
                })
            }
          }
        })
      }
  },
  goLoginPage:function(){
    wx.navigateTo({
      url: '../userLogin/login',
    })
  }
})
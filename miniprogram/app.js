// app.js

App({

  globalData: {
    occupation:"",
    userInfo: null,
    openid:null,
    head:null,
    name:null,
    account:null
  },


  onLaunch: function () {
    const that = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {

      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'shool-1gus62rlb2e36ed3',
        traceUser: true,
      });



    }
    //获取用户openid
    console.log("222")
    wx.cloud.callFunction({
      name:'quickstartFunctions',
      success(res){
        console.log("111")
        console.log(res.result)
        that.globalData.openid = res.result.openid
        //console.log(that.globalData.openid)
        //查找数据库用户表里面是否有这个用户记录
        wx.cloud.database().collection("login_users").where({
          _openid: res.result.openid
        }).get({
          success(result){
            console.log(result)
            that.globalData.userInfo = result.data[0]._openid
            that.globalData.head = result.data[0].avatarUrl
            that.globalData.name = result.data[0].nickName
          }
        })
        wx.redirectTo({
          //url:"pages/try/try"
          url: '/pages/log_in/log_in'
      })
      }
    })

    //this.globalData = {};

    
  },

});

// pages/occupation/occupation.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: '0', name: '保存登录信息', checked: 'true'},
      {value: '1', name: '不保存登录信息'}
    ],
    apple:'0'
  },






  
  save(res){
    console.log(res)
    this.data.apple = res.detail.value
    //this.data.apple 
  },




  btnsub(res){
    console.log(app)
    wx.cloud.database().collection("login_users").where({
      account:Number(res.detail.value.name)
    }).get().then(ress=>{
      console.log(ress.data)
      console.log(res.detail.value)
        if(ress.data.length != "0" && ress.data[0].password == res.detail.value.password){
          if (this.data.apple=="0"){
            console.log("baocun")
            console.log(res.detail.value.name)
            wx.cloud.database().collection("login_users").where({
              account:Number(res.detail.value.name)
            }).update({
              data:{
                joinid:app.globalData.openid
              }
            })
          }
          console.log(res.detail.value.occupation)
          app.globalData.occupation = ress.data[0].occupation
          app.globalData.account = ress.data[0].account
          wx.reLaunch({
            url: '/pages/user/user'
        })
        }else{ress == null
          wx.showToast({
            title: '请输入正确的账号或密码',
            icon: 'none',
            duration:2000
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
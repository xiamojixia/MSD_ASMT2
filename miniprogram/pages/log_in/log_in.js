// pages/log_in/log_in.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oh_yeah:''
  },

  login(){
    console.log(app.globalData)
    wx.cloud.database().collection("login_users").where({
      joinid:app.globalData.openid
    }).get().then(res=>{
      console.log(res.data[0])
      if(res.data[0]==undefined){
        console.log("没找到")
        wx.reLaunch({
          url: '/pages/occupation/occupation'
        })
      }else{
        app.globalData.account = res.data[0].account
        app.globalData.occupation=res.data[0].occupation
        console.log("找到了")
        wx.showToast({
          title: '登录成功',
          duration:1000
        })
        wx.reLaunch({
          url: '/pages/home/home'
       })
    }
  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
// sign_in/pages/home/home.js
const db=wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    button:false,
    where:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  btnsub(options){
    var that = this
  wx.getLocation({
    type: "wgs84",
    isHighAccuracy: true,
    highAccuracyExpireTime: 20000,
    success(res) {
      console.log(res)
        wx.chooseLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            success: function(ress){
              console.log(ress)
              that.data.where=ress.name
              console.log(res.latitude - ress.latitude)
              console.log(res.longitude - ress.longitude)
              if (res.latitude - ress.latitude > -0.002 && res.latitude - ress.latitude < 0.002 &&
                res.longitude - ress.longitude > -0.002 && res.longitude - ress.longitude < 0.002)
              {
                that.setData({
                  where : that.data.where
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: '请选择真实位置',
                })
              }
	    }
        })
    }
  })



  },


  checkboxChange(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == "true"){
    this.setData({
      button : true
    })
  }else{
    this.setData({
      button : false
    })
  }
  },

  btnsub2(res){
    console.log(app)
    var that = this
    if (that.data.where == ""){
      wx.showModal({
        title: '提示',
        content: '您还未进行定位',
        success: function (res) {
          if (res.confirm) {
            that.btnsub()
          }
        }
      })
    }else{
      db.collection("sign_in").add({
        data:{
          account:app.globalData.account,
          where:that.data.where
        }
      }).then(res=>{
        console.log(res)
      }) 
      
    }
  },



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
// pages/home/home.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //current: 0,
    indicators: true, // 是否显示指示点
    autoplay: true, // 是否自动播放
    interval: 3000, // 图片切换的间隔时间
    duration: 500, // 图片切换的动画时长
    imageUrl: [],
    projectlist: [],
    dataList:[],
    
    isloding:false
  },




  list(num=5,page=0){
    console.log(page)
    wx.cloud.callFunction({
      name:"domegetlist",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      var olData=this.data.dataList
      var newData=olData.concat(res.result.data);
      console.log(newData)
      this.setData({
        dataList:newData
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.list()

  //--------------------------------------项目信息显示
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    //-------------------------------显示登录成功

    
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
    var page=this.data.dataList.length
    this.list(5,page)
    console.log('触发了上拉触底事件')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
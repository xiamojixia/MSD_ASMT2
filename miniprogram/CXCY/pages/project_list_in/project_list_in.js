// pages/project_list_in/project_list_in.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },




  head(){
    wx.cloud.downloadFile({
      fileID: 'cloud://shool-1gus62rlb2e36ed3.7368-shool-1gus62rlb2e36ed3-1319592195/users/'+this.data.list.project_people+'.jpg', // 云存储中图片的文件 ID
      success: res => {
      //用户已经保存过的头像
        this.setData({
          picUrl:res.tempFilePath
        })
      },
      fail: err => {
        // 用户未保存头像
        this.setData({
          picUrl:'/pages/images/tabs/head.png'
        })
      }
    })
  },

  information(){
    var lits;
    wx.cloud.database().collection("people").where({
      account:this.data.list.project_people
    }).get().then(ress=>{
        console.log("查到了")
        //console.log(ress)
        this.data.lits=ress
        //console.log(this.data.lits)
        this.setData({
          ress
        })
      })
    },

  getDate(){
    wx.cloud.database().collection("domelist").where({
      project_leader:Number(this.data.list.project_people)
    }).get().then(res=>{
    console.log(res)
    this.setData({
      datalist:res.data
    })
  })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  this.setData({
    account:app.globalData.account,
    fule:options 
  })
    this.data.list=options
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.head()
    this.information()
    this.getDate()
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
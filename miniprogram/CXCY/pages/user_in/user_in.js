// pages/user_in/user_in.js
const db=wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
    index: 0,

    grade: ['23级','22级','21级','20级','19级','18级'],
    index2:0,

    college:['马克思主义学院','机械与汽车工程学院','生物与化学工程学院','土木建筑工程学院','自动化学院','电子工程学院','经济与管理学院','医学部','理学院','人文艺术与设计学院','外国语学院','体育学院','启迪数字学院','计算机科学与技术学院','国际教育学院','继续教育学院','创新创业学院'],
    index3:0,


    id:'',
    t_length:0,
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickergrade: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickercollege: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },


  bindText:function(e){
    var t_text = e.detail.value.length;
    this.setData({
      t_length:t_text,
    })
  },

  btnsub(res){
    var {QQ,college,name,intro,grade,phone,wechat}=res.detail.value;
    console.log(this.data.id)
    db.collection("people").doc(this.data.id).update({
      data:{
        QQ:QQ,
        college:this.data.college[this.data.index3],
        gender:this.data.array[this.data.index],
        name:name,
        intro:intro,
        grade:this.data.grade[this.data.index2],
        phone:phone,
        wechat:wechat
      },
    })
    app.globalData.name=name
    console.log(res.detail.value)
    console.log(app.globalData.name)
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id=options._id
    this.setData({
      information:options,
    })
    console.log(options);
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
// pages/add/add.js
const db=wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    college:['马克思主义学院','机械与汽车工程学院','生物与化学工程学院','土木建筑工程学院','自动化学院','电子工程学院','经济与管理学院','医学部','理学院','人文艺术与设计学院','外国语学院','体育学院','启迪数字学院','计算机科学与技术学院','国际教育学院','继续教育学院','创新创业学院'],
    index3:0,
  },

  bindPickercollege: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },

  //提交表单添加进数据库
  btnsub(res){
    var {project_neme,project_introduction, project_need}=res.detail.value;
    //console.log(project_leader, project_teather, project_college, project_introduction, project_need)
    var name;
    console.log(res.detail)
    wx.cloud.database().collection("people").where({
      account:app.globalData.account
    }).get().then(ress=>{
      if(ress.data.length==0){
        name=app.globalData.name
        console.log("找到了")
      }else{
        console.log(ress.data[0].name)
        name=ress.data[0].name
        console.log(name)
      }
      console.log(name)
      if (app.globalData.occupation=='student'){
        db.collection("domelist").add({
          data:{
            project_neme:project_neme,
            project_leader:[
              app.globalData.account,name
            ],
            project_teather:[],
            project_teathers:[],
            project_college:this.data.college[this.data.index3],
            project_introduction:project_introduction,
            project_need:project_need,
            project_want:[],
            project_member:[]
          }
        }).then(res=>{
          console.log(res)
        }) 
        }else if (app.globalData.occupation=='teather'){
          db.collection("domelist").add({
            data:{
              project_neme:project_neme,
              project_leader:[
              ],
              project_teather:[app.globalData.account,name],
              project_teathers:[],
              project_college:this.data.college[this.data.index3],
              project_introduction:project_introduction,
              project_need:project_need,
              project_want:[['want']],
              project_member:[]
            }
          }).then(res=>{
            console.log(res)
          }) 
        }

      wx.showToast({
        title: '提交成功',})
        wx.reLaunch({
          url: '/pages/user/user'
      })
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
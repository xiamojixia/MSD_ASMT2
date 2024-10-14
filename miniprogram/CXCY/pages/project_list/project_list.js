// pages/project_list/project_list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:{},
    list:[],
    list2:[],
    none_btn:'none',
    none_leader:'none'
  },


  delete(){
    console.log(this.data.list2)
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除该项目？',
      success(res) {
        if (res.confirm) {
          // 用户点击了确定按钮
          console.log('用户点击了确定按钮');
          wx.cloud.database().collection('domelist').doc(that.data.list2._id).remove({
            success: function(res) {
              console.log(res.data)
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else if (res.cancel) {
          // 用户点击了取消按钮
          console.log('用户点击了取消按钮');
        }
      }
    })
  },



  show(){
    this.setData({
      openid:app.globalData.openid,
      none_leader:'none'
    })
    wx.cloud.database().collection("domelist").where({
      _id:this.data.list.project_id
    }).get().then(res=>{
      console.log(res)
      this.data.list2=res.data[0]
      console.log(this.data.list2)
      this.setData({
        none_btn:this.data.none_btn,
        list2:res.data[0],
        query:res.data[0].project_neme
      })
      if(app.globalData.account==this.data.list2.project_leader[0]||app.globalData.account==this.data.list2.project_teather[0]||  this.data.list2.project_teathers.some(item => item.find(id => id === app.globalData.account)) ||
      this.data.list2.project_member.some(item => item.find(id => id === app.globalData.account)) ||
      this.data.list2.project_want.some(item => item.find(id => id === app.globalData.account))
      ){
        console.log("yes")
      }else{
        this.data.none_btn='show'
        this.setData({
          none_btn:this.data.none_btn
        })
      }
      if(app.globalData.account==this.data.list2.project_leader[0]||app.globalData.account==this.data.list2.project_teather[0]){const teathers = this.data.list2.project_want.filter(sublist => sublist.includes('teather'))
      const students = this.data.list2.project_want.filter(sublist => sublist.includes('student'))
      this.setData({
        none_leader:'show',
        teathers:teathers,
        students:students
      })
      }
    })

  },


  showApplicantInfo: function(e){
    //console.log(e)
    let openid = e.currentTarget.dataset['index'];
    let occupation = e.currentTarget.dataset['occupation']
    console.log("点了")
    console.log(openid)
    wx.navigateTo({
      url: '/pages/project_list_in/project_list_in?project_leader='+this.data.list2.project_leader+'&project_people='+account+'&project_teather='+this.data.list2.project_teather+'&occupation='+occupation
    });

  },



  approveApplication_teather: function(e){
    let index = e.currentTarget.dataset['index'];
    console.log(this.data.list2.project_want)
    console.log("索引值：" + index);
    console.log("点了")
    this.data.list2.project_teathers.push(this.data.list2.project_want[index])
    this.data.list2.project_want.splice(index,1)
    wx.cloud.database().collection("domelist").doc(this.data.list2._id).update({
      data:{
        project_teathers:this.data.list2.project_teathers,
        project_want:this.data.list2.project_want
      },
      success:function(res){
        console.log(res)
        wx.showToast({
          title: '提交成功',})
          wx.navigateBack({
            delta: 1
          })
      }
    })
  },


  approveApplication_student: function(e){
    let index = e.currentTarget.dataset['index'];
    console.log(this.data.list2.project_want)
    console.log("索引值：" + index);
    console.log("点了")
    this.data.list2.project_member.push(this.data.list2.project_want[index])
    this.data.list2.project_want.splice(index,1)
    wx.cloud.database().collection("domelist").doc(this.data.list2._id).update({
      data:{
        project_member:this.data.list2.project_member,
        project_want:this.data.list2.project_want
      },
      success:function(res){
        console.log(res)
        wx.showToast({
          title: '提交成功',})
          wx.navigateBack({
            delta: 1
          })
      }
    })
  },



  join(){
    wx.cloud.database().collection("people").where({
      account:app.globalData.account
    }).get().then(ress=>{
      console.log(ress)
      app.globalData.name=ress.data[0].name
      console.log(app.globalData)
      console.log(this.data.list2)
      //db=wx.cloud.database();
      //_ =db.command;
      this.data.list2.project_want.push([app.globalData.account,app.globalData.name,app.globalData.occupation])
      console.log(this.data.list2.project_want)
      wx.cloud.database().collection("domelist").doc(this.data.list2._id).update({
        data:{
          project_want:this.data.list2.project_want
        },
        success:function(res){
          console.log(res)
          wx.showToast({
            title: '提交成功',})
            wx.navigateBack({
              delta: 1
            })
        }
      })

      })
  
  },



  modification(){
    var id=this.data.list.project_id
    console.log(id)
    wx.navigateTo({
      url: '/pages/project_modification/project_modification?id='+id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.list=options
    this.show()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title:this.data.list.project_neme
    })


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
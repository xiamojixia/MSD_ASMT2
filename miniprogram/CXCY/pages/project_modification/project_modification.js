// pages/project_modification/project_modification.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change:[],
    id:"",
    college:['马克思主义学院','机械与汽车工程学院','生物与化学工程学院','土木建筑工程学院','自动化学院','电子工程学院','经济与管理学院','医学部','理学院','人文艺术与设计学院','外国语学院','体育学院','启迪数字学院','计算机科学与技术学院','国际教育学院','继续教育学院','创新创业学院'],
    index3:0,
  },



  btnsub(res){
    var {project_neme,project_introduction, project_need}=res.detail.value;
    wx.cloud.database().collection('domelist').doc(this.data.change.data[0]._id).update({
      // data 传入需要局部更新的数据
      data: {
        project_neme:project_neme,
        project_introduction:project_introduction,
        project_need:project_need,
        project_college:this.data.college[this.data.index3]
      },
      success: function(res) {
        console.log(res.data)
        wx.navigateBack({
          delta: 2
        })
      }
    })

  },


  show(){
    wx.cloud.database().collection("domelist").where({
      _id:this.data.id
    }).get().then(res=>{
      this.data.change=res
      this.setData({
        information:res
      })
      console.log(res);
    })
  },


  bindPickercollege: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },


  lender: function(e){
    var that = this
    var name=e.currentTarget.dataset.name
    wx.showModal({
      title: '提示',
      content: '确定将'+`${name}`+'设为项目负责人？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          if (that.data.change.data[0].project_leader!=undefined){
            //将项目负责人后面添加student
            that.data.change.data[0].project_leader.push('student')
            //将项目负责人添加到member
            that.data.change.data[0].project_member.push(that.data.change.data[0].project_leader)
          }
          //将新负责人信息获取出来
          that.data.change.data[0].project_leader=that.data.change.data[0].project_member[e.currentTarget.dataset.id].slice(0,2)
          //删除原成员
          that.data.change.data[0].project_member.splice(e.currentTarget.dataset.id,1)
          wx.cloud.database().collection('domelist').doc(that.data.change.data[0]._id).update({
            // data 传入需要局部更新的数据
            data: {
              project_member:that.data.change.data[0].project_member,
              project_leader:that.data.change.data[0].project_leader
            },
            success: function(res) {
              console.log(res.data)
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },


  teacher: function(e){
    var that = this
    var name=e.currentTarget.dataset.name
    wx.showModal({
      title: '提示',
      content: '确定将'+`${name}`+'设为指导老师？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          if (that.data.change.data[0].project_teather!=undefined){
              //将项目负责人后面添加student
            that.data.change.data[0].project_teather.push('teather')
            //将项目负责人添加到member
            that.data.change.data[0].project_teathers.push(that.data.change.data[0].project_teather)
          }
          //将新负责人信息获取出来
          that.data.change.data[0].project_teather=that.data.change.data[0].project_teathers[e.currentTarget.dataset.id].slice(0,2)
          console.log(that.data.change.data[0].project_teather)
          console.log(that.data.change.data[0].project_teathers)
          //删除原成员
          console.log(that.data.change.data[0].project_teathers)
          console.log(e.currentTarget.dataset.id)
          that.data.change.data[0].project_teathers.splice(e.currentTarget.dataset.id,1)
          console.log(that.data.change.data[0].project_teathers)

          wx.cloud.database().collection('domelist').doc(that.data.change.data[0]._id).update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 done 字段置为 true
              project_teathers:that.data.change.data[0].project_teathers,
              project_teather:that.data.change.data[0].project_teather
            },
            success: function(res) {
              console.log(res.data)
              wx.navigateBack({
                delta: 2
              })
            }
          }) 
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })

  },


  delete_student: function(e){
    var that = this
    var name=e.currentTarget.dataset.name
    wx.showModal({
      title: '提示',
      content: '确定将'+`${name}`+'删除？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          that.data.change.data[0].project_member.splice(e.currentTarget.dataset.id,1)
          wx.cloud.database().collection('domelist').doc(that.data.change.data[0]._id).update({
            // data 传入需要局部更新的数据
            data: {
              project_member:that.data.change.data[0].project_member,
              project_leader:that.data.change.data[0].project_leader
            },
            success: function(res) {
              console.log(res.data)
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })

  },


  delete_teather: function(e){
    var that = this
    var name=e.currentTarget.dataset.name
    wx.showModal({
      title: '提示',
      content: '确定将'+`${name}`+'删除？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          that.data.change.data[0].project_teathers.splice(e.currentTarget.dataset.id,1)
          wx.cloud.database().collection('domelist').doc(that.data.change.data[0]._id).update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 done 字段置为 true
              project_teathers:that.data.change.data[0].project_teathers,
              project_teather:that.data.change.data[0].project_teather
            },
            success: function(res) {
              console.log(res.data)
              wx.navigateBack({
                delta: 2
              })
            }
          }) 
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id = options.id
    this.show()
    console.log(this.data.id)
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
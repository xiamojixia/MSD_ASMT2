// PC/pages/home_PC/home_PC.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chose_where:0,
    chose_week:0,
    chose_time:0,
    list1:[],
    list2:[],
    color:"",
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    sport:['羽毛球','排球'],
    where:['一号场','二号场','三号场','四号场','五号场','六号场','七号场','八号场'],
    time:[],
    objectWeek: [
      {
        id: 0,
        name: '周一'
      },
      {
        id: 1,
        name: '周二'
      },
      {
        id: 2,
        name: '周三'
      },
      {
        id: 3,
        name: '周四'
      },
      {
        id: 4,
        name: '周五'
      },
      {
        id: 5,
        name: '周六'
      },
      {
        id: 6,
        name: '周日'
      }
    ],
    objectSport: [
      {
        id: 0,
        name: '羽毛球'
      },{
        id: 1,
        name: '排球'
      }
    ],
    objectWhere: [
      {
        id: 0,
        name: '一号场'
      },{
        id: 1,
        name: '二号场'
      },{
        id: 2,
        name: '三号场'
      },{
        id: 3,
        name: '四号场'
      },{
        id: 4,
        name: '五号场'
      },{
        id: 5,
        name: '六号场'
      },{
        id: 6,
        name: '七号场'
      },{
        id: 7,
        name: '八号场'
      }
    ],
    objectTime: [
      {
        id: 0,
        name: '18:30~20:00'
      },{
        id: 1,
        name: '20:00~22:00'
      }
    ],
    index1: 10,
    index2: 10,
    index3: 10,
    index4: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 
  },
  weekChange: function(e) {
    this.data.chose_where = e.detail.value
    this.setData({
      index1: e.detail.value,
    })

  },

  sportChange: function(e) {
    var newlist = []
    var that = this
    console.log("hello")
    this.setData({
      index2: e.detail.value,
    })
    db.collection('PC').where({
      sport:that.data.sport[that.data.index2]
    }).get({
      success: function(res) {
        for(var i = 0;i < res.data.length;i++){
          if (i == 0) {
            that.data.list1 = res.data[i].short_time
          }else{
            that.data.list2 = res.data[i].short_time
            var result = []; // 结果列表
           newlist = []
            for (var j = 0; j < that.data.list1.length; j++) {
              var result= []
              for (var q = 0; q < 7;q++){
                var sum = []
                sum = that.data.list1[j][q] + that.data.list2[j][q]; // 对应位置元素相加
                result.push(sum) // 将结果添加到结果列表
              }
              newlist.push(result)
            }
          }
        }
        that.setData({
          newlist: newlist
        })
      }
    })
  },




  whereChange: function(e) {
    this.data.chose_week = e.detail.value
    console.log(this.data.chose_where)
    console.log(this.data.chose_week)
    console.log(this.data.list1)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value,
    })
    if (this.data.list1[this.data.chose_week][this.data.chose_where]== 1 && this.data.list2[this.data.chose_week][this.data.chose_where] == 1){
      this.setData({
        time:['18:30~20:00','20:00~22:00']
      })
    }else if(this.data.list1[this.data.chose_week][this.data.chose_where] == 1 && this.data.list2[this.data.chose_week][this.data.chose_where] == 0){
      this.setData({
        time:['18:30~20:00']
      })
    }else if(this.data.list1[this.data.chose_week][this.data.chose_where] == 0 && this.data.list2[this.data.chose_week][this.data.chose_where] == 1){
      this.setData({
        time:['20:00~22:00']
      })
    }else{
      this.setData({
        time:[]
      })
    }
  },




  timeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
    this.data.color=this.data.time[e.detail.value]
  },

  button(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '预定'+that.data.week[that.data.index1]+that.data.sport[that.data.index2]+that.data.where[that.data.index3]+that.data.time[that.data.index4],
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          db.collection("PC").where({
            sport:that.data.sport[that.data.index2],
            time:that.data.color
          }).get().then(res=>{
            db.collection("PC").doc(res.data[0]._id).update({
            data:{
              short_time:{
                [that.data.chose_week]:{
                  [that.data.chose_where]:0
                  }
                }
              },
            })
          })
          wx.reLaunch({
            url: '../../../pages/HOME/HOME'
          });
        } else {//这里是点击了取消以后
        }
      }
    })

   
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

// pages/home/home.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicators: true, // 是否显示指示点
    autoplay: true, // 是否自动播放
    interval: 3000, // 图片切换的间隔时间
    duration: 500, // 图片切换的动画时长
    imageUrl: [],
    projectlist: [],
    dataList:[],
    isloding:false,

    gridlist:['体育场馆预约','创业创新平台','入校签到','请假','功能开发中','功能开发中']
    //六宫格图片存贮列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.picture();
    this.item();
  },
  
  picture() {
    wx.stopPullDownRefresh();
    var that = this;
    db.collection("picture").where({
      picture:"2"
    }).get({
      success: function(res) {
        console.log(res)
        var fileIDs = res.data.map(function(item) {
          return item.fileID;
        });
        
        var imagePaths = [];
        var count = 0;
        for (var i = 0; i < fileIDs.length; i++) {
          wx.cloud.downloadFile({
            fileID: fileIDs[i],
            success: function(res) {
              imagePaths.push(res.tempFilePath);
              count++;
              if (count === fileIDs.length) {
                that.setData({
                  imageUrl: imagePaths
                });
              }
            },
            fail: function(err) {
              console.log(err);
            }
          });
        }
      },
      fail: function(err) {
        console.log(err);
      }
    });
  },
  
  item(){
    wx.stopPullDownRefresh();
    var that = this;
  
    db.collection("picture").where({
      picture:"1"
    }).get({
      success: function(res) {
        console.log(res);
        var fileIDs = res.data.map(function(item) {
          return item.fileID;
        });
  
        var imagePaths = [];
        var count = 0;
        for (var i = 0; i < fileIDs.length; i++) {
          wx.cloud.downloadFile({
            fileID: fileIDs[i],
            success: function(res) {
              imagePaths.push(res.tempFilePath); 
              count++;
              if (count === fileIDs.length) {
                that.setData({
                  gridlist_pr: imagePaths,
                  gridlist: that.data.gridlist
                });
              }
            },
            fail: function(err) {
              console.log(err);
            }
          });
        }
      },
      fail: function(err) {
        console.log(err);
      }
    });
  },
  
  ii:function(event){
    console.log(event.currentTarget.dataset.hi);
    if(event.currentTarget.dataset.hi==0){
      console.log("yes")
      wx.navigateTo({
        url: '../../PC/pages/home_PC/home_PC'
      });
    }else if(event.currentTarget.dataset.hi==1){
      console.log("yes")
      wx.navigateTo({
        url: '../../CXCY/pages/home_CXCY/home_CXCY'
      })
    }else if (event.currentTarget.dataset.hi==2){
      console.log("yes")
      wx.navigateTo({
        url: '../../sign_in/pages/home/home'
      })
    }else if (event.currentTarget.dataset.hi==3){
      console.log("yes")
      wx.navigateTo({
        url: '../../leave/pages/home/home'
      })
    }else(event.currentTarget.dataset.hi!=1 && event.currentTarget.dataset.hi!=0 && event.currentTarget.dataset.hi!=2 && event.currentTarget.dataset.hi!=3)
    wx.navigateTo({
      url: '/pages/try/try'
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    
  }
});
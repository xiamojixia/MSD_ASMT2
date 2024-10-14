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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //-------------------------------轮播图的获取
    wx.stopPullDownRefresh();
    var that = this; //------------------------------- 声明一个变量保存当前页面的上下文
 
    db.collection("picture").where({
      picture:"0"
    }).get({
      success: function(res) {
        var fileIDs = res.data.map(function(item) {
          return item.fileID;
        });
        //console.log(fileIDs);


        var imagePaths = [];
        for (var i = 0; i < fileIDs.length; i++) {
          wx.cloud.downloadFile({
            fileID: fileIDs[i],
//202200408048
//242710
    
            success: function(res) {
              //console.log(res)
              //console.log(res.tempFilePath)
              imagePaths.push(res.tempFilePath); 
              that.setData({
                imageUrl: imagePaths
              });
              //console.log(that.data.swiperlist)

              // 下载成功后的操作
            },
          fail: function(err) {
            // 下载失败后的操作
            console.log("fileIDs");
          }
        });
      }
      },
      fail: function(err) {
        // 获取数据失败后的操作
      }
    });
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
    //轮播图的获取
    wx.stopPullDownRefresh();
    var that = this; // 声明一个变量保存当前页面的上下文
 
    db.collection("picture").get({
      success: function(res) {
        var fileIDs = res.data.map(function(item) {
          return item.fileID;
        });
        //console.log(fileIDs);


        var imagePaths = [];
        for (var i = 0; i < fileIDs.length; i++) {
          wx.cloud.downloadFile({
            fileID: fileIDs[i],

    
            success: function(res) {
              //console.log(res)
              //console.log(res.tempFilePath)
              imagePaths.push(res.tempFilePath); 
              that.setData({
                imageUrl: imagePaths
              });
              //console.log(that.data.swiperlist)

              // 下载成功后的操作
            },
          fail: function(err) {
            // 下载失败后的操作
            console.log("fileIDs");
          }
        });
      }
      },
      fail: function(err) {
        // 获取数据失败后的操作
      }
    });

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

  },
})
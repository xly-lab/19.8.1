// pages/hello/article-detail/article-detail.js
const essayDataAll = require("../../../utils/posts-data.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    essayData: [],
    isCollected: false,
    postid: 0,
    isPlay: false
  },
  
  playMusic: function(e) {
    let {
      isPlay,
      essayData
    } = this.data;
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = essayData.music.title
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // 设置了 src 之后会自动播放

    if (!isPlay) {
      isPlay = false;
      backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    } else {
      isPlay = true;
      backgroundAudioManager.pause();
    }
    this.setData({
      isPlay
    })
  },

  shareTap: function(e) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#afd0da',
      success: function(res) {
      wx.showModal({
        title: '用户' + itemList[res.tapIndex],
        content: '用户是否取消？' + res.cancle + "现在无法实现分享功能",
      })
      }
    })
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.g_play);
    const essayData = essayDataAll.postList[options.postid];
    this.setData({
      essayData,
      postid: options.postid,
    })
    if(app.globalData.g_play && app.globalData.currentId === postid){
      this.setData({ isPlay:true})
    }
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    var that = this;
    backgroundAudioManager.onPlay(function () {
      that.setData({ isPlay: true })
      app.globalData.g_play = true
      app.globalData.currentId=that.data.postid;
    })
    backgroundAudioManager.onPause(function () {
      that.setData({ isPlay: false })
      app.globalData.g_play = false
      app.globalData.currentId = that.data.postid;

    })
    
    const { postid } = this.data;
    if (!wx.getStorageSync(`isCollecteds[${postid}]`))
      wx.setStorageSync(`isCollecteds[${postid}]`, false);
    const isCollected = wx.getStorageSync(`isCollecteds[${postid}]`)
    this.setData({
      isCollected
    })



  },
  collected: function(e) {
    const {
      postid
    } = this.data;
    if (wx.getStorageSync(`isCollecteds[${postid}]`)) {
      wx.setStorageSync(`isCollecteds[${postid}]`, false);
      wx.showToast({
        title: '取消收藏',
        icon: "none",
        duration: 2000
      })
    } else {
      wx.setStorageSync(`isCollecteds[${postid}]`, true);
      wx.showToast({
        title: '收藏成功',
        icon: "success",
        duration: 2000
      })
    }
    const isCollected = wx.getStorageSync(`isCollecteds[${postid}]`);
    this.setData({
      isCollected
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
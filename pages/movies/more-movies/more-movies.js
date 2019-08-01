// pages/movies/more-movies/more-movies.js
const tools = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manyMovies: []
  },
  goMovieDetails: function(e) {
    var { details } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/movies/movies-details/movies-details?details=${details}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.tip,
    })
    wx.request({
      url: 'https://www.apiopen.top/satinGodApi?type=1&page=1',
      success: (res) => {
        that.setData({
          manyMovies: res.data.data
        })
        that.newMoumt();
        getApp().globalData.manyMovies = this.data.manyMovies
      }
    })



  },
  newMoumt: function() {
    const {
      manyMovies
    } = this.data;

    var newData = []
    for (var item in manyMovies) {
      let newEveryData = manyMovies[item]
      newEveryData.soureid = (Math.floor(newEveryData.soureid) / (10000000.0)).toFixed(1);
      newEveryData.star = tools.changeToStar1(newEveryData.soureid)
      if (newEveryData.username.length >= 6) {
        newEveryData.username = newEveryData.username.substring(6, 0) + "...";
      }
      newData.push(newEveryData);
    }
    this.setData({
      manyMovies: newData
    })
  }
  
})
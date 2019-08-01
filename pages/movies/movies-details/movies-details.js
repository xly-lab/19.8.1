// pages/movies/movies-details/movies-details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneMovie: {}
  },
  viewMoviePostImg: function (e) {
    wx.previewImage({
      urls: [this.data.oneMovie.header],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let oneMovie = {}
    const myMovs = app.globalData.manyMovies
    oneMovie = myMovs.filter(item => item.uid === options.details)//从前一页面
    if (oneMovie.length > 0) {
      oneMovie = oneMovie[0]
      this.setData({
        oneMovie
      })
    }
    wx.setNavigationBarTitle({
      title: oneMovie.username
    })
  }
})
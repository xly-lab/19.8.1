// pages/movies/movies.js
const tools = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      everyData:[],
      everyHot:[],
      everyNew:[],
      tip:['电影推荐', '最新电影', '热门电影'],
      showClose:false,
      showPages:true,
      manyMovies: [],
      value :''

  },
  moreHandle:function(e){
   
      wx.navigateTo({
        url: `/pages/movies/more-movies/more-movies?tip=${e.currentTarget.dataset.tip}`,
      })
  },
  goMovieDetails: function (e) {
    var { details} =e.currentTarget.dataset

    wx.navigateTo({
      url: `/pages/movies/movies-details/movies-details?details=${details}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (this.data.showPages){
      wx.request({
        url: 'https://api.apiopen.top/musicRankings',
        data: {},
        method: "get",
        success: (res) => {
          that.setData({
            everyData: res.data.result[2].content.splice(1, 3),
            everyHot: res.data.result[0].content.splice(1, 3),
            everyNew: res.data.result[1].content.splice(1, 3),
          })
          that.dataHandle();
        }
      })
    }
  },
  dataHandle:function(){
    const { everyData , everyHot , everyNew }  = this.data;

    var newData = []
    for(var item in everyData){ 
      var newOb = {};
      let newEveryData = everyData[item] 
      newEveryData.album_id = (Math.floor(newEveryData.album_id) / (100000000.0)).toFixed(1);
      newEveryData.star = tools.changeToStar(newEveryData.album_id)     
       if (newEveryData.title.length>=6){
        newEveryData.title= newEveryData.title.substring(6,0)+"...";
      }
      newData.push(newEveryData);
    }
    this.setData({ everyData: newData})
    newData = []
    for (var item in everyHot) {
      var newOb = {};
      let newEveryData = everyHot[item]
      newEveryData.album_id = (Math.floor(newEveryData.album_id) / (100000000.0)).toFixed(1);
      
      newEveryData.star = tools.changeToStar(newEveryData.album_id)  
      if (newEveryData.title.length >= 6) {
        newEveryData.title = newEveryData.title.substring(6, 0) + "...";
      }
      newData.push(newEveryData);
    }
    this.setData({ everyHot: newData })
    newData = []
    for (var item in everyNew) {
      var newOb = {};
      let newEveryData = everyNew[item]
      newEveryData.album_id = (Math.floor(newEveryData.album_id) / (100000000.0)).toFixed(1);
    
      newEveryData.star = tools.changeToStar(newEveryData.album_id)  

      if (newEveryData.title.length >= 6) {
        newEveryData.title = newEveryData.title.substring(6, 0) + "...";
      }
      newData.push(newEveryData);
    }
    this.setData({ everyNew: newData })

    
  },
  // 输入时实时获取input里的值
  getValue:function(e){
    this.setData({
      value: e.detail.value
    })
    if(this.data.value.length>=1)this.setData({showClose:true})
    else this.setData({ showClose : false })
  },
  //失去光标获取数据 
  getData:function(e){
    var that = this
    this.setData({ showPages:false})
    if(this.data.value){
      wx.request({
        url: 'https://www.apiopen.top/satinGodApi?type=1&page=1',
        success: (res) => {
          that.setData({ manyMovies: res.data.data })
          that.newMoumt();
        }
      })
    }else{
      this.setData({ showPages: true })
    }
  },
  newMoumt: function () {
    const { manyMovies } = this.data;

    var newData = []
    for (var item in manyMovies) {
      let newEveryData = manyMovies[item]
      newEveryData.soureid = (Math.floor(newEveryData.soureid) / (10000000.0)).toFixed(1);
      newEveryData.star = tools.changeToStar1(newEveryData.soureid)
      if (newEveryData.username.length >= 6) {
        newEveryData.username = newEveryData.username.substring(6, 0) + "...";//标题超出6个字符就加...
      }
      newData.push(newEveryData);
    }
    this.setData({ manyMovies: newData })
  },
  //点击删除按钮
  cancelAll:function(e){
    e.detail.value=""
    this.setData({
      manyMovies:[],
      showClose:false,//不显示删除图标
      showPages:true,//显示movie页面
      value:""
    })
  }
})
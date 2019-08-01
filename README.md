# 微信小程序

## 名：文与影

	（第一个微信小程序）   随视频做的
	
### 所有页面初览
	
1. ![index.wxml](/images/finishPages/index.jpg)2. ![index.wxml](/images/finishPages/news.jpg)
3. ![index.wxml](/images/finishPages/read.jpg)4. ![index.wxml](/images/finishPages/movies.jpg)
5. ![index.wxml](/images/finishPages/more-movies.jpg)6. ![index.wxml](/images/finishPages/movies-details.jpg)
	
### 第一个页面 入口界面
> ![index.wxml](/images/finishPages/index.jpg)
> 第一个功能按键
> 

	goIn:()=>{
    wx.switchTab({
       url: "../hello/hello"
      });
    },

### 第二个页面 新闻界面
>![index.wxml](/images/finishPages/news.jpg)
>  
>	> 涉及到api的调用 ， 但是没有可用api 模拟了数据 ，在`utils/posts-data.js`目录下，由上面的swiper和每个新闻的模块组成
>	>以下是数据
> 	> 

    const local_database = [
    {
        date: "Sep 18 2016",
        title: "正是虾肥蟹壮时",
        imgSrc: "/images/post/crab.png",
        avatar: "/images/avatar/1.png",
        content: "菊黄蟹正肥，品尝秋之味。徐志摩把,“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满，",
        reading: "112",
        collection: "96",
        headImgSrc: "/images/post/crab.png",
        author: "林白衣",
        dateTime: "24小时前",
        detail: "菊黄蟹正肥，品尝秋之味。徐志摩把“看初花的荻芦”和“到楼外楼吃蟹”并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满，壳凸红脂块块香”；在《世说新语》里，晋毕卓更是感叹“右手持酒杯，左手持蟹螯，拍浮酒船中，便足了一生矣。”漫漫人生长路，美食与爱岂可辜负？于是作为一个吃货，突然也很想回味一下属于我的味蕾记忆。记忆中的秋蟹，是家人的味道，弥漫着浓浓的亲情。\n\n是谁来自山川湖海，却囿于昼夜，厨房与爱？ 是母亲，深思熟虑，聪明耐心。吃蟹前，总会拿出几件工具，煞有介事而乐此不疲。告诉我们螃蟹至寒，需要佐以姜茶以祛寒，在配备的米醋小碟里，亦添入姜丝与紫苏，前者驱寒后者增香。泡好菊花茶，岁月静好，我们静等。",
        postId: 0,
        music: {
            url: "http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38",
            title: "夜夜夜夜-齐秦",
            coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000"
       		 }...
   		}
		module.exports = {
   	 postList: local_database
		}

					
>	> 以下是article-temp模板

	<template name="article-temp">
	  <view class="article-box">
		<view class="article-avatar">
		  <image src="{{avatar}}"></image>
		  <text>{{date}}</text>
		</view>
		<text class="article-title">{{title}}</text>
		<image class="img" src="{{imgSrc}}" mode="aspectFill"></image>
		<text>{{content}}</text>
		<view class="article-footer">
		  <image src="/images/icon/chat.png"></image>
		  <text>{{reading}}</text>
		  <image src="/images/icon/view.png"></image>
		  <text>{{collection}}</text>
		</view>
	  </view>
	</template>


### 第三个页面 
> ![index.wxml](/images/finishPages/read.jpg)
>  新闻界面由上面的

>	>实现三个功能：

>	> - 音乐播放

	获取后台音乐管理对象
    
	 const backgroundAudioManager = wx.getBackgroundAudioManager()
     

>	> - 文章收藏
	
	模拟收藏，标志位存储在本地
    
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

>	> - 文章分享

	分享模拟事项
    
### 第四个页面
> ![index.wxml](/images/finishPages/movies.jpg)

> 由多个组件共同实现
	
>	>有`movie-list-temp`，`movie-temp`，`star-temp`组件

>![index.wxml](/images/finishPages/movie-list-temp.jpg)

>	>movie-list-temp

	<import src="/pages/movies/movie/movie-temp.wxml"/>
		<template name="movie-list-temp">
  		<view class="movie-list-temp" >
    	<view class="header">
     		 <text>{{tip}}</text>
     		 <view class="more" catchtap="moreHandle" data-tip="{{tip}}">
        <text>更多</text>
        <image src="/images/icon/arrow-right.png"></image>
      	</view>
    	</view>
    	<view class="movie-list-temp-movie" >
      	<view  wx:for="{{everyData}}" 
             wx:key="i" 
             catchtap="goMovieDetails"
             data-details="{{item.song_id}}">
        <template is="movie-img-temp" data="{{...item}}"/>
     	 </view>
   		 </view>
		</view>

		</template>
        
>![index.wxml](/images/finishPages/movie-temp.jpg)
        
>	>movie-temp

	<import src='/pages/movies/star/star-temp.wxml'/>
		<template name='movie-img-temp'>
  		<view class="movie-img-temp">
   	 		<image class="movie-img-temp-image" src="{{pic_big}}" mode="aspectFill"></image>
    	<text>{{title}}</text>
   	 		<template is="star-temp" data="{{album_id,star}}"/>
  		</view>
		</template>

>![index.wxml](/images/finishPages/star-temp.jpg)

>	>star-temp

		<template name="star-temp">
            <view class="star-temp">
         <view class="star-stars">
          <view wx:for="{{star}}" wx:key="i">
            <image src="{{item===1?'/images/icon/star.png':'/images/icon/none-star.png'}}"></image>
          </view>
            </view>
            <text>{{album_id}}</text>
        </view>
		</template>
        
### 第五个页面

> ![index.wxml](/images/finishPages/more-movies.jpg)

###第六个页面

>![index.wxml](/images/finishPages/movies-details.jpg)
        





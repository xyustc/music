const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playStatus: false,
    audioIndex: 0,//如果直接播放则改为对应下标
    progress: 0,
    duration: 0,
    currentSong: null,
    songslist: []
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._init()
  },
  //初始化
  _init: function () {
    if (app.songlist.length > 0) {
      if (!this.data.currentSong) {
        let NextSong = app.songlist[app.currentIndex]
        this._getPlayUrl(NextSong.mid)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取播放地址
  _getPlayUrl: function (songmidid) {
    const that = this
    wx.request({
      url: `https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22${songmidid}%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`,
      method: 'get',
      success: function (res) {
        if (res.data.req_0.data.midurlinfo[0].purl) {
          let murl = res.data.req_0.data.sip[0] + res.data.req_0.data.midurlinfo[0].purl;
          that.playMusic(murl)
          let currentSong = app.songlist[app.currentIndex]
          let duration = currentSong && currentSong.duration
          that.setData({
            currentSong: currentSong,
            duration: that.formatTime(duration)
          })
        } else {
          wx.showToast({
            title: '本歌曲暂时不能播放。请切换下一首',
            icon: 'none'
          })
        }
      }
    })
  },

  playMusic: function (murl) {
    const that = this;
    let audio = app.songlist[0] || "";
    let manager = wx.getBackgroundAudioManager();
    manager.title = audio.name || "音频标题";
    manager.epname = audio.album || "专辑名称";
    manager.singer = audio.singer || "歌手名";
    manager.coverImgUrl = audio.image;
    // 设置了 src 之后会自动播放
    manager.src = murl;
    manager.currentTime = 0;
    manager.onPlay(function () {
      console.log("======onPlay======");
      that.setData({
        playStatus: true
      })
      that.countTimeDown(that, manager);
    });
    manager.onPause(function () {
      that.setData({
        playStatus: false
      })
      console.log("======onPause======");
    });
    manager.onEnded(function () {
      console.log("======onEnded======");
      that.setData({
        playStatus: false
      })
      setTimeout(function () {
        that.nextMusic();
      }, 1500);
    });
  },
  //循环计时
  countTimeDown: function (that, manager) {
    if (that.data.playStatus) {
      setTimeout(function () {
        if (that.data.playStatus) {
          that.setData({
            progress: Math.ceil(manager.currentTime),
            progressText: that.formatTime(Math.ceil(manager.currentTime)),
            duration: Math.ceil(manager.duration),
            durationText: that.formatTime(Math.ceil(manager.duration))
          })
          that.countTimeDown(that, manager);
        }
      }, 1000)
    }
  },
  //拖动事件
  sliderChange: function (e) {
    let manager = wx.getBackgroundAudioManager();
    manager.pause();
    manager.seek(e.detail.value);
    this.setData({
      progressText: this.formatTime(e.detail.value)
    })
    setTimeout(function () {
      manager.play();
    }, 1000);
  },

  //上一首
  lastMusic: function () {
    if (app.songlist.length > 0) {
      let currentIndex = app.currentIndex > 0 ? app.currentIndex - 1 : this.data.songslist.length - 1;
      app.currentIndex = currentIndex
      this.setData({
        playStatus: false,
        progress: 0,
        progressText: "00:00",
        durationText: "00:00"
      })
      this._init()
    }
  },

  //播放按钮
  playOrpause: function () {
    let manager = wx.getBackgroundAudioManager();
    if (this.data.playStatus) {
      manager.pause();
    } else {
      manager.play();
    }
  },

  //下一首
  nextMusic: function () {
    if (app.songlist.length > 0) {
      let currentIndex = app.currentIndex < this.data.songslist.length - 1 ? app.currentIndex + 1 : 0;
      app.currentIndex = currentIndex
      this.setData({
        playStatus: false,
        progress: 0,
        progressText: "00:00",
        durationText: "00:00"
      })
      this._init()
    }
  },


  //格式化时长
  formatTime: function (s) {
    let t = '';
    s = Math.floor(s);
    if (s > -1) {
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
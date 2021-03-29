/*
 * @Description: 
 * @Author: XingYu
 * @Date: 2021-03-28 19:09:27
 * @LastEditTime: 2021-03-29 22:07:25
 */
const app = getApp()
const api = require('../../utils/api.js')
const song = require('../../utils/song.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getTopMusicList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  _getTopMusicList: function () {
    api.getTopMusicList(app.globalData.topId).then((res)=>{
      var res1 = res.data.replace('jp1(', '')
      var res2 = JSON.parse(res1.substring(0, res1.length - 1))
      var res3 = res2.songlist
      app.globalData.toplist = this._normalizeSongs(res3)
      if(app.globalData.topId == app.globalData.nowTopid){
        this.setData({
          flag: true
        })
        console.log(this.data.flag)
      }else{
        this.setData({
          flag: false
        })
        console.log(this.data.flag)
      }
      this.setData({
        songlist: app.globalData.toplist,
        culist: app.globalData.songlist,
        cuindex: app.globalData.currentIndex
      })
    })
  },
  _normalizeSongs:function(list) {
    let ret = [];
    list.forEach((item) => {
      const musicdata = item.data
      if (musicdata.songid && musicdata.albummid) {
        ret.push(song.createSong(musicdata))
      }
    })
    return ret
  },
  _selectSong:function(event) {
    const index = event.currentTarget.dataset.index
    app.globalData.songlist = app.globalData.toplist
    app.globalData.currentIndex = index
    app.globalData.nowTopid = app.globalData.topId
    wx.switchTab({
      url: '/pages/index/index',
    })
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
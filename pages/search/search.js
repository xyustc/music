/*
 * @Description: 
 * @Author: XingYu
 * @Date: 2021-03-25 08:19:03
 * @LastEditTime: 2021-03-25 09:53:14
 */
const api = require('../../utils/api.js')
const songs = require('../../utils/song.js')
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: false
  },
  searchAction: function (event) {
    console.log(event)
    const keyWrod = event.detail.value
    api.search(keyWrod).then((res) => {
      let res1 = res.data.replace('SmartboxKeysCallbackmod_top_search3847(', '')
      let res2 = JSON.parse(res1.substring(0, res1.length - 1))
      console.log(res2)
      this.dealData(res2.data)
    }).catch((res) => {
      console.log(res)
    })
  },
  dealData: function (data) {
    if (data) {
      this.setData({
        result: true
      })
      data.singer ? this.setData({
        singers: data.singer.itemlist
      }) : this.setData({
        singers: []
      })
      data.song ? this.setData({
        songs: data.song.itemlist
      }) : this.setData({
        songs: []
      })
    } else {
      this.setData({
        result: false
      })
    }
  },
  selectSong: function (event) {
    console.log(event)
    const mid = event.currentTarget.dataset.mid
    api.getSongDetails(mid).then((res) => {
      var res1 = res.data.replace('getOneSongInfoCallback(', '')
      var res2 = JSON.parse(res1.substring(0, res1.length - 1)).data[0]
      console.log(res2)
      let song = {
        id: res2.id,
        mid: mid,
        singer: songs.filterSinger(res2.singer),
        name: res2.name,
        album: res2.album.name,
        duration: res2.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${res2.album.mid}.jpg?max_age=2592000`,
        musicId: res2.id
      }
      app.songlist = [song]
      app.currentIndex = 0
      wx.switchTab({
        url: '/pages/index/index'
      })
    }).catch(() => {
      console.log("?")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
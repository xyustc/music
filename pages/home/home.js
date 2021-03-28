/*
 * @Description: 
 * @Author: XingYu
 * @Date: 2021-03-25 21:55:28
 * @LastEditTime: 2021-03-28 23:43:44
 */
const app = getApp()
const api = require("../../utils/api.js")
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
    this._getRankData()
  },

  toSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  _selectItemRank: function (event) {
    const data = event.currentTarget.dataset.data
    console.log(data.id)
    app.globalData.topId = data.id
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  _getRankData: function () {
    api.getTopList().then((res) => {
      var res1 = res.data.replace('jp1(', '')
      var res2 = JSON.parse(res1.substring(0, res1.length - 1))
      this.setData({
        topList: res2.data.topList
      })
    })
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
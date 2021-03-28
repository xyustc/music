/*
 * @Description: 
 * @Author: XingYu
 * @Date: 2021-03-25 08:30:13
 * @LastEditTime: 2021-03-25 08:56:57
 */

const search = (key) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&key=${key}g_tk=5381&jsonpCallback=SmartboxKeysCallbackmod_top_search3847&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
      data: {
        is_xml: 0,
        format: 'jsonp',
        key: key,
        g_tk: 5381,
        jsonpCallback: 'SmartboxKeysCallbackmod_top_search3847',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const getSongDetails = (mid) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${mid}&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback&g_tk=5381&jsonpCallback=getOneSongInfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
      data: {
        songmid: mid,
        tpl: 'yqq_song_detail',
        format: 'jsonp',
        callback: 'getOneSongInfoCallback',
        g_tk: 5381,
        jsonpCallback: 'getOneSongInfoCallback',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const getSingerSongs = (singermid, startIndex) => {
  wx.showLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=40&songstatus=1&singermid=${singermid}&jsonpCallback=callback`,
      data: {
        g_tk: 5381,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: startIndex,
        num: 40,
        songstatus: 1,
        singermid: singermid,
        jsonpCallback: 'callback'
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}


module.exports = {
  search: search,
  getSongDetails: getSongDetails,
  getSingerSongs: getSingerSongs
}

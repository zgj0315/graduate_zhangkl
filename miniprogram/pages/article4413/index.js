// pages/article4413/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    openid: '',
    checkIn9Am: false,
    checkIn3Pm: false,
    checkIn6Pm: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    let self = this
    wx.cloud.callFunction({
      name: 'getId',
      success: function (res) {
        self.setData({
          openid: res.result.openid
        })
      },
      fail: console.error
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    var date = new Date()
    date = new Date(date.toLocaleDateString())
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_check_in').where({
      type: 'drug',
      date: date.getTime()
    }).get({
      success: function (res) {
        for (var indexData in res.data) {
          if (res.data[indexData].step === '9AM') {
            self.setData({
              checkIn9Am: true
            })
          } else if (res.data[indexData].step === '3PM') {
            self.setData({
              checkIn3Pm: true
            })
          } else if (res.data[indexData].step === '6PM') {
            self.setData({
              checkIn6Pm: true
            })
          }
        }
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: () => {
        // console.log('[数据库] [查询记录] 完成')
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  checkIn(e) {
    var date = new Date()
    date = new Date(date.toLocaleDateString())
    const db = wx.cloud.database()
    db.collection('zkf_check_in').add({
      data: {
        type: 'drug',
        step: e.currentTarget.dataset.step,
        date: date.getTime()
      },
      success: function (res) {
        console.log(res)
      }
    })
    if (e.currentTarget.dataset.step === '9AM') {
      this.setData({
        checkIn9Am: true
      })
    } else if (e.currentTarget.dataset.step === '3PM') {
      this.setData({
        checkIn3Pm: true
      })
    } else if (e.currentTarget.dataset.step === '6PM') {
      this.setData({
        checkIn6Pm: true
      })
    }
  }
})
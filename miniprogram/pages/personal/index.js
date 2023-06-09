// pages/personal/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    week_list: ['日', '一', '二', '三', '四', '五', '六'],
    checkin_list: [],

  },

  /**
   * Lifecycle function--Called when page load
   */
  // onLoad(options) {

  // },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  // onShow() {

  // },

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

  onLoad(options) {

  },

  onShow() {
    const db = wx.cloud.database()
    db.collection('zkf_check_in').where({

    }).get({
      success: function (res) {
        for (var indexData in res.data) {
          // console.log('res.data: ', res.data[indexData])
          var date = new Date(res.data[indexData].date);
          console.log('type: ', res.data[indexData].type, ', step: ', res.data[indexData].step, ', getDay: ', date.getDay())
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
})
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
    const day_long = 1000 * 60 * 60 * 24
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_check_in').where({
    }).orderBy('date', 'asc').get({
      success: function (res) {
        var week_lasted = -1
        var week_list = []
        var checkin_list = []
        var time = 0
        for (var indexData in res.data) {
          var date = new Date(res.data[indexData].date);
          if (week_lasted <= date.getDay()) {
            week_lasted = date.getDay()
          } else {
            checkin_list.push(week_list)
            week_lasted = -1;
            week_list = []
          }
          if (week_list.length == 0) {
            var offset = date.getDay();
            time = date.getTime()
            for (var i = 0; i < 7; i++) {
              var date_tmp = new Date(time - day_long * (offset - i))
              week_list.push([date_tmp.getDate(), 0])
            }
          }
          week_list[date.getDay()][1] = 1
        }
        checkin_list.push(week_list)
        console.log('checkin_list: ', checkin_list)
        self.setData({
          checkin_list: checkin_list
        })
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
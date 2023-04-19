// pages/faq-detail/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    faqId: '',
    question: '',
    answer: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({
      faqId: options.faqId
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
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_faq').doc(self.data.faqId).get({
      success: function(res) {
        // res.data 包含该记录的数据
        self.setData({
          question: res.data.question,
          answer: res.data.answer
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

  }
})
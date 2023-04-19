// pages/faq/index.js

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    searchKeyword: '',
    faqList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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
    // console.log('begin show')
    // const db = wx.cloud.database()
    // db.collection('zkf_faq').doc('5dfc487a643cae4a00052a8509dd22ab').get({
    //   success: function(res) {
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    //   }
    // })
    // console.log('openid: ', app.globalData.openid)
    // console.log('searchKeyword: ', this.data.searchKeyword)
    // console.log('end show')
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

  searchFAQ() {
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_faq').where({
      keywords: self.data.searchKeyword
    }).get({
      success: function(res) {
        self.setData({
          faqList: res.data
        })
        // console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: () => {
        // console.log('[数据库] [查询记录] 完成')
      }
    })
    // console.log('faqList: ', this.data.faqList)
  }
})
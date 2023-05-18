// pages/faq/index.js

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    inputVal: '',
    faqList: [],
    keywords: []
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
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_faq').get({
      success: function (res) {
        var tmpKeyworks = []
        for (var indexData in res.data) {
          for (var indexKeywords in res.data[indexData].keywords) {
            if (tmpKeyworks.indexOf(res.data[indexData].keywords[indexKeywords]) == -1) {
              tmpKeyworks.push(res.data[indexData].keywords[indexKeywords])
            }
          }
        }
        self.setData({
          keywords: tmpKeyworks
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

  },

  searchFAQ() {
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_faq').where({
      keywords: self.data.inputVal
    }).get({
      success: function (res) {
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
  },
  
  selectKeyword(e) {
    this.setData({
      inputVal: e.currentTarget.dataset.keyword
    })
    this.searchFAQ()
  },

  toDetail(e) {
    const { id: faqId } = e.currentTarget.dataset
    // console.log('faqId: ', faqId)
    wx.navigateTo({
      url: `/pages/faq-detail/index?faqId=${faqId}`,
    })
  },
})
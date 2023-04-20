// pages/consult/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    openid: '',
    question: '',
    consultList: [],
    isShowQuestionForm: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    let self = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getId',
      success: function(res) {
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
    this.searchConsult()
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

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

  inputQuestion() {
    // do nothing
  },

  submitQuestion() {
    console.log('submitQuestion')
    console.log('question: ', this.data.question)
    const db = wx.cloud.database()
    db.collection('zkf_consult').add({
      data: {
        question: this.data.question
      },
      success: function(res) {
        console.log(res)
      }
    })
    this.setData({
      isShowQuestionForm: false
    })
    this.searchConsult()
  },

  searchConsult() {
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_consult').where({
      _openid: this.data.openid
    }).get({
      success: function(res) {
        self.setData({
          consultList: res.data
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
  },

  toSonsult() {
    this.setData({
      isShowQuestionForm: true
    })
  },

  toDetail(e) {
    const {id: consultId} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/consult-detail/index?consultId=${consultId}`,
    })
  }
})
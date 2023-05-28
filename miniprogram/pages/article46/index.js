// pages/article46/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    input: '',
    message: '',
    inputed: false
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

  submit() {
    if (this.data.input < 50.0) {
      this.setData({
        message: '及时就医',
        inputed: true
      })
    } else if (this.data.input > 75) {
      this.setData({
        message: '继续观察',
        inputed: true
      })
    } else {
      this.setData({
        message: '巨和粒1.5mg（1支），皮下注射，2-3天后复查血常规。注射后：＞75*109/L—建议：可停止巨和粒注射。＜75*109/L—建议：继续注射至血小板数＞75*109/L。',
        inputed: true
      })
    }
  },

  input() {    
  }
})
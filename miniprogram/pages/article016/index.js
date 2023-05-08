// pages/article016/index.js
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
    if (this.data.temperature < 1.0) {
      this.setData({
        message: '注射瑞白后骨髓抑制无好转，请及时就医。',
        inputed: true
      })
    } else if (this.data.temperature > 3.0) {
      this.setData({
        message: '继续观察',
        inputed: true
      })
    } else {
      this.setData({
        message: '瑞白150ug（每日一支）皮下注射，连续注射2-3天后复查血常规。注射后：＞5.0*109/L—建议：可停止瑞白注射。＜5.0*109/L—建议：继续注射白细胞至5.0*109/L。',
        inputed: true
      })
    }
  },

  input() {    
  }
})
// pages/article41/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    temperature: '',
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
    if (this.data.temperature < 37.2) {
      this.setData({
        message: '体温正常，继续监测体温。',
        inputed: true
      })
    } else if (this.data.temperature > 38.5) {
      this.setData({
        message: '体温持续升高，及时就医。',
        inputed: true
      })
    } else {
      this.setData({
        message: '多饮水，采取物理降温，30分钟后再次监测体温。',
        inputed: true
      })
    }
  },

  inputTemperature() {    
  }
})
// pages/article42/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    items: [
      { name: '1', value: '轻微恶心' },
      { name: '2', value: '呕吐' },
      { name: '3', value: '腹胀', },
      { name: '4', value: '腹痛', },
      { name: '5', value: '恶心', },
      { name: '6', value: '排气排便停止', },
    ],
    message: '',
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

  checkboxChange(e) {
    const items = this.data.items
    const values = e.detail.value
    this.setData({
      message: ''
    })
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].name === values[j]) {
          items[i].checked = true
          if ('1' === values[j] || '2' === values[j] || '3' === values[j]) {
            this.setData({
              message: '根据身体情况多活动，遵医嘱服用助排气排便药物。'
            })
          } else if ('4' === values[j] || '5' === values[j] || '6' === values[j]) {
            this.setData({
              message: '先禁食禁水，及时就医。'
            })
          }
          break
        }
      }
    }
    this.setData({
      items
    })
  },
})
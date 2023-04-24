// pages/article010/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    theme: 'light',
    items: [
      { value: '001', name: '轻微恶心' },
      { value: '002', name: '呕吐' },
      { value: '003', name: '腹胀' },
      { value: '004', name: '腹痛' },
      { value: '005', name: '恶心' },
      { value: '006', name: '排气排便停止' }
    ],
    message: ''
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
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    this.setData({
      message: ''
    })
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          if ('001' === values[j] || '002' === values[j] || '003' === values[j]) {
            this.setData({
              message: '根据身体情况多活动，遵医嘱服用助排气排便药物。'
            })
          } else if ('004' === values[j] || '005' === values[j] || '006' === values[j]) {
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
  }
})
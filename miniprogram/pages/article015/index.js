// pages/article015/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    theme: 'light',
    items: [
      { value: '001', name: '轻微红肿' },
      { value: '002', name: '硬结' },
      { value: '003', name: '血肿' },
      { value: '004', name: '未化脓' },
      { value: '005', name: '裂开化脓' },
      { value: '006', name: '脂肪液化' }
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
          if ('001' === values[j] || '002' === values[j] || '003' === values[j] || '004' === values[j]) {
            this.setData({
              message: '遵医嘱服用抗生素，保持伤口清洁干燥，按时换药，如未好转及时就医。'
            })
          } else if ('005' === values[j] || '006' === values[j]) {
            this.setData({
              message: '及时就医。'
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
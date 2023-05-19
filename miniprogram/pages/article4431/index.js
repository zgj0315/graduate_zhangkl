// pages/article443/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    id_baseline: '',
    ankle_left_baseline: '',
    ankle_right_baseline: '',
    shank_left_baseline: '',
    shank_right_baseline: '',
    thigh_left_baseline: '',
    thigh_right_baseline: '',
    id_today: '',
    ankle_left_today: '',
    ankle_right_today: '',
    shank_left_today: '',
    shank_right_today: '',
    thigh_left_today: '',
    thigh_right_today: '',
    baseline_input_enable: false,
    today_input_enable: false,
    toast: false,
    hideToast: false,
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
    const date = new Date()
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_leg_circumference').where({
      type: 'baseline'
    }).get({
      success: function (res) {
        for (var indexData in res.data) {
          self.setData({
            id_baseline: res.data[indexData]._id,
            ankle_left_baseline: res.data[indexData].ankle_left_baseline,
            ankle_right_baseline: res.data[indexData].ankle_right_baseline,
            shank_left_baseline: res.data[indexData].shank_left_baseline,
            shank_right_baseline: res.data[indexData].shank_right_baseline,
            thigh_left_baseline: res.data[indexData].thigh_left_baseline,
            thigh_right_baseline: res.data[indexData].thigh_right_baseline,
          })
        }
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: () => {
        // console.log('[数据库] [查询记录] 完成')
      }
    })

    db.collection('zkf_leg_circumference').where({
      type: 'daily',
      date: date.toLocaleDateString()
    }).get({
      success: function (res) {
        for (var indexData in res.data) {
          self.setData({
            id_today: res.data[indexData]._id,
            ankle_left_today: res.data[indexData].ankle_left_today,
            ankle_right_today: res.data[indexData].ankle_right_today,
            shank_left_today: res.data[indexData].shank_left_today,
            shank_right_today: res.data[indexData].shank_right_today,
            thigh_left_today: res.data[indexData].thigh_left_today,
            thigh_right_today: res.data[indexData].thigh_right_today,
          })
        }
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

  input() {
  },

  baselineInput() {
    this.setData({
      baseline_input_enable: true,
    })
  },

  todayInput() {
    this.setData({
      today_input_enable: true,
    })
  },

  submit() {
    const date = new Date()
    const db = wx.cloud.database()
    if (this.data.baseline_input_enable) {
      if (this.data.id_baseline.length > 0) {
        console.log('update baseline', this.data.id_baseline)
        db.collection('zkf_leg_circumference').doc(this.data.id_baseline).update({
          data: {
            type: 'baseline',
            date: date.toLocaleDateString(),
            ankle_left_baseline: this.data.ankle_left_baseline,
            ankle_right_baseline: this.data.ankle_right_baseline,
            shank_left_baseline: this.data.shank_left_baseline,
            shank_right_baseline: this.data.shank_right_baseline,
            thigh_left_baseline: this.data.thigh_left_baseline,
            thigh_right_baseline: this.data.thigh_right_baseline,
          },
          success: function (res) {
            console.log(res)
          }
        })
      } else {
        console.log('add baseline', this.data.id_baseline)
        db.collection('zkf_leg_circumference').add({
          data: {
            type: 'baseline',
            date: date.toLocaleDateString(),
            ankle_left_baseline: this.data.ankle_left_baseline,
            ankle_right_baseline: this.data.ankle_right_baseline,
            shank_left_baseline: this.data.shank_left_baseline,
            shank_right_baseline: this.data.shank_right_baseline,
            thigh_left_baseline: this.data.thigh_left_baseline,
            thigh_right_baseline: this.data.thigh_right_baseline,
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    }
    if (this.data.today_input_enable) {
      if (this.data.id_today.length > 0) {
        console.log('update today', this.data.id_today)
        db.collection('zkf_leg_circumference').doc(this.data.id_today).update({
          data: {
            type: 'daily',
            date: date.toLocaleDateString(),
            ankle_left_today: this.data.ankle_left_today,
            ankle_right_today: this.data.ankle_right_today,
            shank_left_today: this.data.shank_left_today,
            shank_right_today: this.data.shank_right_today,
            thigh_left_today: this.data.thigh_left_today,
            thigh_right_today: this.data.thigh_right_today,
          },
          success: function (res) {
            console.log(res)
          }
        })
      } else {
        console.log('add today', this.data.id_today)
        db.collection('zkf_leg_circumference').add({
          data: {
            type: 'daily',
            date: date.toLocaleDateString(),
            ankle_left_today: this.data.ankle_left_today,
            ankle_right_today: this.data.ankle_right_today,
            shank_left_today: this.data.shank_left_today,
            shank_right_today: this.data.shank_right_today,
            thigh_left_today: this.data.thigh_left_today,
            thigh_right_today: this.data.thigh_right_today,
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    }
    this.setData({
      toast: true,
    });
    setTimeout(() => {
      this.setData({
        hideToast: true,
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
        });
      }, 300);
    }, 3000);
  },

})
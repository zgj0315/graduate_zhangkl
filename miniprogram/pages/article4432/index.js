// pages/article4432/index.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '腿围趋势分析',
      left: 'center'
    },
    legend: {
      data: ['踝左', '踝右', '小左', '小右', '大左', '大右'],
      top: 50,
      left: 'center',
      backgroundColor: 'white',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: '踝左',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: '踝右',
      type: 'line',
      smooth: true,
      data: [17, 34, 61, 34, 71, 46, 37]
    }, {
      name: '小左',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: '小右',
      type: 'line',
      smooth: true,
      data: [13, 51, 52, 36, 71, 31, 21]
    }, {
      name: '大左',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: '大右',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * Page initial data
   */
  data: {
    ankle_left_baseline: '',
    ankle_right_baseline: '',
    shank_left_baseline: '',
    shank_right_baseline: '',
    thigh_left_baseline: '',
    thigh_right_baseline: '',
    ankle_left_list: [],
    ankle_right_list: [],
    shank_left_list: [],
    shank_right_list: [],
    thigh_left_list: [],
    thigh_right_list: [],
    ec: {
      onInit: initChart
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    let self = this
    wx.cloud.callFunction({
      name: 'getId',
      success: function (res) {
        self.setData({
          openid: res.result.openid
        })
      },
      fail: console.error
    })
    console.log(this.data.openid)
    const date = new Date()
    const db = wx.cloud.database()
    db.collection('zkf_leg_circumference').where({
      type: 'baseline'
    }).get({
      success: function (res) {
        console.log(res.data)
        for (var indexData in res.data) {
          self.setData({
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
        console.log('[数据库] [查询记录] 完成')
      }
    })
    db.collection('zkf_leg_circumference').where({
      type: 'daily',
    }).orderBy('date', 'asc').get({
      success: function (res) {
        console.log(res.data)
        var ankle_left_list = []
        var ankle_right_list = []
        var shank_left_list = []
        var shank_right_list = []
        var thigh_left_list = []
        var thigh_right_list = []
        ankle_left_list.push(this.data.ankle_left_baseline)
        ankle_right_list.push(this.data.ankle_right_baseline)
        shank_left_list.push(this.data.shank_left_baseline)
        shank_right_list.push(this.data.shank_right_baseline)
        thigh_left_list.push(this.data.thigh_left_baseline)
        thigh_right_list.push(this.data.thigh_right_baseline)
        for (var indexData in res.data) {
          ankle_left_list.push(res.data[indexData].ankle_left_today)
          ankle_right_list.push(res.data[indexData].ankle_right_today)
          shank_left_list.push(res.data[indexData].shank_left_today)
          shank_right_list.push(res.data[indexData].shank_right_today)
          thigh_left_list.push(res.data[indexData].thigh_left_today)
          thigh_right_list.push(res.data[indexData].thigh_right_today)
        }
        self.setData({
          ankle_left_list: ankle_left_list,
          ankle_right_list: ankle_right_list,
          shank_left_list: shank_left_list,
          shank_right_list: shank_right_list,
          thigh_left_list: thigh_left_list,
          thigh_right_list: thigh_right_list,
        })
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: () => {
        console.log('[数据库] [查询记录] 完成')
      }
    })
    console.log(this.data.ankle_left_list)
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

  }
})
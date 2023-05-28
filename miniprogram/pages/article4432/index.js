// pages/article4432/index.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    title: [],
    list_x: [],
    ankle_left_list: [],
    ankle_right_list: [],
    shank_left_list: [],
    shank_right_list: [],
    thigh_left_list: [],
    thigh_right_list: [],
    ec: {
      lazyLoad: true
    },
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('onLoad')
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    this.ecComponent = this.selectComponent('#mychart-dom-line');
    this.initData()
    console.log('onReady')
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    console.log('onShow')
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

  setOption(chart) {
    const option = {
      title: {
        text: this.data.title,
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
        data: this.data.list_x
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
        data: this.data.ankle_left_list
      }, {
        name: '踝右',
        type: 'line',
        smooth: true,
        data: this.data.ankle_right_list
      }, {
        name: '小左',
        type: 'line',
        smooth: true,
        data: this.data.shank_left_list
      }, {
        name: '小右',
        type: 'line',
        smooth: true,
        data: this.data.shank_right_list
      }, {
        name: '大左',
        type: 'line',
        smooth: true,
        data: this.data.thigh_left_list
      }, {
        name: '大右',
        type: 'line',
        smooth: true,
        data: this.data.thigh_right_list
      }]
    };
    chart.setOption(option);
  },

  initECharts() {
    console.log(this.data.ankle_left_list)
    console.log('begin initECharts')
    this.ecComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      this.setOption(chart);
      this.chart = chart;
      return chart;
    });
    console.log('end initECharts')
  },

  initData() {
    let self = this
    const db = wx.cloud.database()
    db.collection('zkf_leg_circumference').where({
      // type: 'daily',
    }).orderBy('date', 'asc').get({
      success: function (res) {
        var list_x = []
        var ankle_left_list = []
        var ankle_right_list = []
        var shank_left_list = []
        var shank_right_list = []
        var thigh_left_list = []
        var thigh_right_list = []
        for (var indexData in res.data) {
          if ('baseline' === res.data[indexData].type) {
            list_x.push(res.data[indexData].date)
            ankle_left_list.push(res.data[indexData].ankle_left_baseline)
            ankle_right_list.push(res.data[indexData].ankle_right_baseline)
            shank_left_list.push(res.data[indexData].shank_left_baseline)
            shank_right_list.push(res.data[indexData].shank_right_baseline)
            thigh_left_list.push(res.data[indexData].thigh_left_baseline)
            thigh_right_list.push(res.data[indexData].thigh_right_baseline)
          } else if ('daily' === res.data[indexData].type) {
            list_x.push(res.data[indexData].date)
            ankle_left_list.push(res.data[indexData].ankle_left_today)
            ankle_right_list.push(res.data[indexData].ankle_right_today)
            shank_left_list.push(res.data[indexData].shank_left_today)
            shank_right_list.push(res.data[indexData].shank_right_today)
            thigh_left_list.push(res.data[indexData].thigh_left_today)
            thigh_right_list.push(res.data[indexData].thigh_right_today)
          }
        }
        self.setData({
          list_x: list_x,
          ankle_left_list: ankle_left_list,
          ankle_right_list: ankle_right_list,
          shank_left_list: shank_left_list,
          shank_right_list: shank_right_list,
          thigh_left_list: thigh_left_list,
          thigh_right_list: thigh_right_list,
        })
        console.log('list_x: ', self.data.list_x)
        console.log('ankle_left_list: ', self.data.ankle_left_list)
        console.log('ankle_right_list: ', self.data.ankle_right_list)
        console.log('shank_left_list: ', self.data.shank_left_list)
        console.log('shank_right_list: ', self.data.shank_right_list)
        console.log('thigh_left_list: ', self.data.thigh_left_list)
        console.log('thigh_right_list: ', self.data.thigh_right_list)
        const ankle_left = (self.data.ankle_left_list[self.data.ankle_left_list.length - 1] - self.data.ankle_left_list[0]) / self.data.ankle_left_list[self.data.ankle_left_list.length - 1]
        const ankle_right = (self.data.ankle_right_list[self.data.ankle_right_list.length - 1] - self.data.ankle_right_list[0]) / self.data.ankle_right_list[self.data.ankle_right_list.length - 1]
        const shank_left = (self.data.shank_left_list[self.data.shank_left_list.length - 1] - self.data.shank_left_list[0]) / self.data.shank_left_list[self.data.shank_left_list.length - 1]
        const shank_right = (self.data.shank_right_list[self.data.shank_right_list.length - 1] - self.data.shank_right_list[0]) / self.data.shank_right_list[self.data.shank_right_list.length - 1]
        const thigh_left = (self.data.thigh_left_list[self.data.thigh_left_list.length - 1] - self.data.thigh_left_list[0]) / self.data.thigh_left_list[self.data.thigh_left_list.length - 1]
        const thigh_right = (self.data.thigh_right_list[self.data.thigh_right_list.length - 1] - self.data.thigh_right_list[0]) / self.data.thigh_right_list[self.data.thigh_right_list.length - 1]
        if (ankle_left < 0.1 && ankle_right < 0.1 && shank_left < 0.1 && shank_right < 0.1 && thigh_left < 0.1 && thigh_right < 0.1) {
          self.setData({
            title: '腿围确实分析--轻度淋巴水肿'
          })
        } else if (ankle_left > 0.3 || ankle_right > 0.3 || shank_left > 0.3 || shank_right > 0.3 || thigh_left > 0.3 || thigh_right > 0.3) {
          self.setData({
            title: '腿围确实分析--重度淋巴水肿'
          })
        } else {
          self.setData({
            title: '腿围确实分析--中度淋巴水肿'
          })
        }
        self.initECharts()
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: () => {
        // console.log('[数据库] [查询记录] 完成')
      }
    })
    // console.log(this.data.ankle_left_list)
  }
})
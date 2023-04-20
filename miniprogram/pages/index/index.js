// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '专家简介',
      tip: '医生及护士信息介绍',
      showItem: false,
      item: [{
        title: '医生出诊信息',
        page: 'article002'
      },
       {
        title: '护士护理专长',
        page: 'article003'
      },
    ]
    }, {
      title: '健康科普',
      tip: '有问题，早发现，早治疗',
      showItem: false,
      item: [{
        title: '卵巢癌',
        page: 'article004'
      }, {
        title: '宫颈癌',
        page: 'article005'
      }, {
        title: '子宫内膜癌',
        page: 'article014'
      }]
    }, {
      title: '术后护理行为建议',
      tip: '该做什么，不该做什么',
      showItem: false,
      item: [{
        title: '术后护理知识',
        page: 'article006'
      }, {
        title: '居家观察及自我康复',
        page: 'article007'
      }, {
        title: '复查及随访',
        page: 'article008'
      }]
    }, {
      title: '化疗管理',
      tip: '副作用及其并发症',
      showItem: false,
      item: [{
        title: '化疗期间注意事项',
        page: 'article001'
      }]
    }, {
      title: '并发症自我管理及预警',
      tip: '并发症不可怕',
      showItem: false,
      item: [{
        title: '并发症症状自评',
        page: 'article009'
      }, {
        title: '并发症风险预警',
        page: 'article010'
      }]
    }, {
      title: '心理健康',
      tip: '一直在关爱，偶尔去治疗',
      showItem: false,
      item: [{
        title: '放松的音乐',
        page: 'article011'
      }, {
        title: '放松的图片',
        page: 'article012'
      }, {
        title: '正性案例',
        page: 'article013'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  }
});

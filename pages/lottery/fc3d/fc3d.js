// pages/lottery/fc3d/fc3d.js
Page({
  data: {
    lotteryData: [],
    showFloatBtn: false,
    showVR: false,
    viewX: 0,
    viewY: 0,
    scale: 1,
    deviceAlpha: 0,
    deviceBeta: 0,
    deviceGamma: 0,
    lastUpdateTime: 0
  },

  onLoad: function (options) {
    this.generateLotteryData();
  },

  generateLotteryData: function() {
    const data = [];
    const basePeriod = 2024001;
    
    for (let i = 0; i < 10; i++) {
      const hundreds = Math.floor(Math.random() * 10);
      const tens = Math.floor(Math.random() * 10);
      const ones = Math.floor(Math.random() * 10);
      
      const angle = (i / 10) * Math.PI * 2;
      const radius = 150;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (i - 5) * 80;
      
      data.push({
        id: i,
        period: basePeriod + i,
        winningNumber: `${hundreds}${tens}${ones}`,
        hundreds: hundreds,
        tens: tens,
        ones: ones,
        x: x,
        y: y,
        z: z
      });
    }
    
    this.setData({
      lotteryData: data
    });
  },

  onRandomSelect: function() {
    wx.showToast({
      title: '随机选号',
      icon: 'none'
    });
  },

  onScan: function() {
    wx.showToast({
      title: '扫一扫',
      icon: 'none'
    });
  },

  onFilter: function() {
    wx.showToast({
      title: '筛选查询',
      icon: 'none'
    });
  },

  onFavorite: function() {
    wx.showToast({
      title: '我的收藏',
      icon: 'none'
    });
  },

  onFloatBtnClick: function() {
    if (this.data.showVR) {
      this.setData({
        showVR: false
      });
      this.stopDeviceMotion();
    } else if (this.data.showFloatBtn) {
      this.setData({
        showVR: true
      });
      this.startDeviceMotion();
    } else {
      this.setData({
        showFloatBtn: true
      });
    }
  },

  startDeviceMotion: function() {
    const that = this;
    
    wx.startDeviceMotionListening({
      interval: 'ui',
      success: function() {
        console.log('设备方向监听启动成功');
      },
      fail: function(err) {
        console.error('设备方向监听启动失败', err);
      }
    });
    
    wx.onDeviceMotionChange(function(res) {
      const alpha = res.alpha;
      const beta = res.beta;
      const gamma = res.gamma;
      
      // 节流：限制更新频率，避免卡顿
      const now = Date.now();
      if (now - that.data.lastUpdateTime < 8) {
        return;
      }
      
      // 移动视角（摄像机位置），而不是旋转看板
      // gamma: 左右倾斜 (-90 到 90)，控制水平移动
      // beta: 前后倾斜 (0 到 180)，控制垂直移动
      const viewX = gamma * 15;  // 水平移动范围（30度转动即可看全）
      const viewY = (beta - 45) * 10;  // 垂直移动范围（30度转动即可看全）
      
      // 使用更高效的更新方式
      that.setData({
        viewX: Math.max(-600, Math.min(600, viewX)),
        viewY: Math.max(-450, Math.min(450, viewY)),
        lastUpdateTime: now
      });
    });
  },

  stopDeviceMotion: function() {
    wx.stopDeviceMotionListening();
    wx.offDeviceMotionChange();
    this.setData({
      viewX: 0,
      viewY: 0,
      deviceAlpha: 0,
      deviceBeta: 0,
      deviceGamma: 0
    });
  },

  onCloseVR: function() {
    this.stopDeviceMotion();
    this.setData({
      showVR: false,
      showFloatBtn: false
    });
  },

  stopPropagation: function() {
  },

  onZoomIn: function() {
    const newScale = Math.min(this.data.scale + 0.2, 2);
    this.setData({
      scale: newScale
    });
  },

  onZoomOut: function() {
    const newScale = Math.max(this.data.scale - 0.2, 0.5);
    this.setData({
      scale: newScale
    });
  },

  onResetView: function() {
    this.setData({
      viewX: 0,
      viewY: 0,
      scale: 1
    });
  }
})
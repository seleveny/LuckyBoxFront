// pages/lottery/fc3d/fc3d.js
Page({
  data: {
    lotteryData: [],
    showFloatBtn: false,
    showVR: false,
    viewX: 0,
    viewY: 0,
    scale: 1,
    vrScale: 2.5,  // VR看板缩放比例
    deviceAlpha: 0,
    deviceBeta: 0,
    deviceGamma: 0,
    lastUpdateTime: 0
  },

  // 用于平滑过渡的目标值
  targetViewX: 0,
  targetViewY: 0,
  animationFrameId: null,

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
      
      data.push({
        id: i,
        period: basePeriod + i,
        winningNumber: `${hundreds}${tens}${ones}`,
        hundreds: hundreds,
        tens: tens,
        ones: ones
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
    
    // 初始位置：看到看板顶端（上方区域），所以视口要往下偏移
    this.targetViewX = 0;
    this.targetViewY = -600;  // 初始看到上方区域
    
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
      const beta = res.beta;
      const gamma = res.gamma;
      
      // 节流：限制更新频率为30fps（33ms），避免过于频繁的更新
      const now = Date.now();
      if (now - that.data.lastUpdateTime < 33) {
        return;
      }
      
      // 计算目标位置（手机移动时，视角向相反方向移动）
      // gamma: 左右倾斜 (-90 到 90)，控制水平移动
      // beta: 前后倾斜 (0 到 180)，控制垂直移动
      // 注意：眼睛向左看，应该看到看板的左边，所以视口要向右移（相反方向）
      const targetX = -gamma * 40;  // 取反：镜头左移，视口右移，看到左边
      const targetY = -(beta - 45) * 30;  // 取反：低头下移，视口上移，看到下方
      
      // 限制范围 - 让移动范围足够大以查看整个看板
      that.targetViewX = Math.max(-1200, Math.min(1200, targetX));
      that.targetViewY = Math.max(-1000, Math.min(1000, targetY));
      
      that.setData({
        lastUpdateTime: now
      });
      
      // 启动平滑动画
      if (!that.animationFrameId) {
        that.smoothUpdate();
      }
    });
  },

  // 平滑更新视角位置
  smoothUpdate: function() {
    const that = this;
    const currentX = this.data.viewX;
    const currentY = this.data.viewY;
    
    // 使用线性插值实现平滑过渡（0.15的系数表示平滑程度）
    const newX = currentX + (this.targetViewX - currentX) * 0.15;
    const newY = currentY + (this.targetViewY - currentY) * 0.15;
    
    // 如果接近目标值，直接设置为目标值
    if (Math.abs(newX - this.targetViewX) < 0.5 && Math.abs(newY - this.targetViewY) < 0.5) {
      this.setData({
        viewX: this.targetViewX,
        viewY: this.targetViewY
      });
      this.animationFrameId = null;
      return;
    }
    
    this.setData({
      viewX: newX,
      viewY: newY
    });
    
    // 继续下一帧动画
    this.animationFrameId = requestAnimationFrame(function() {
      that.smoothUpdate();
    });
  },

  stopDeviceMotion: function() {
    wx.stopDeviceMotionListening();
    wx.offDeviceMotionChange();
    
    // 取消动画帧
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.setData({
      viewX: 0,
      viewY: 0,
      deviceAlpha: 0,
      deviceBeta: 0,
      deviceGamma: 0
    });
    
    this.targetViewX = 0;
    this.targetViewY = 0;
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
    // 放大看板 = 靠近看板（距离减小）
    const currentScale = this.data.vrScale || 2.5;
    const newScale = Math.min(currentScale + 0.5, 5);
    this.setData({
      vrScale: newScale
    });
    // 更新CSS变量
    this.updateVRScale(newScale);
  },

  onZoomOut: function() {
    // 缩小看板 = 远离看板（距离增大）
    const currentScale = this.data.vrScale || 2.5;
    const newScale = Math.max(currentScale - 0.5, 1);
    this.setData({
      vrScale: newScale
    });
    // 更新CSS变量
    this.updateVRScale(newScale);
  },

  updateVRScale: function(scale) {
    const query = wx.createSelectorQuery();
    query.select('.vr-board').node();
    query.exec((res) => {
      if (res[0]) {
        // 通过设置style来更新CSS变量
        const vrBoard = res[0].node;
        if (vrBoard) {
          vrBoard.style.setProperty('--vr-scale', scale);
        }
      }
    });
  },

  onResetView: function() {
    this.targetViewX = 0;
    this.targetViewY = -600;  // 重置到顶端
    this.setData({
      viewX: 0,
      viewY: -600,
      vrScale: 2.5
    });
    this.updateVRScale(2.5);
  }
})

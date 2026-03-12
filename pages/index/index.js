//index.js
Page({
  data: {
    userInfo: null,
    showAuthModal: false
  },
  
  onLoad: function() {
    // 从全局获取用户信息
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else if (app.globalData.needAuth) {
      // 需要授权，显示授权提示
      this.showAuthModal();
    }
  },
  
  showAuthModal: function() {
    this.setData({
      showAuthModal: true
    });
  },
  
  hideAuthModal: function() {
    this.setData({
      showAuthModal: false
    });
  },
  
  onAuthSuccess: function(e) {
    // 存储到全局数据
    const app = getApp();
    app.globalData.needAuth = false;
    
    // 更新页面数据，显示用户信息
    this.setData({
      userInfo: e.detail
    });
    
    // 先登录获取openid和unionId
    app.login();
    
    // 显示成功提示
    wx.showToast({
      title: '微信授权成功',
      icon: 'success'
    });
  },
  
  onAuthFail: function() {
    // 显示失败提示
    wx.showToast({
      title: '授权失败',
      icon: 'none'
    });
  },
  
  onPhoneSuccess: function(e) {
    const code = e.detail;
    // 发送手机号授权code到后端接口
    const app = getApp();
    app.sendPhoneCodeToBackend(code);
    
    // 显示成功提示
    wx.showToast({
      title: '手机号授权成功',
      icon: 'success'
    });
  },
  
  onPhoneFail: function() {
    // 显示失败提示
    wx.showToast({
      title: '手机号授权失败',
      icon: 'none'
    });
  },
  
  onLotteryTap: function(e) {
    const lottery = e.detail;
    // 跳转到对应的彩票页面
    wx.navigateTo({
      url: lottery.page
    });
  },
  
  goToUserPage: function() {
    // 跳转到个人中心页面
    wx.navigateTo({
      url: '/pages/user/user'
    });
  }
});
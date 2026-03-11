// app.js
const api = require('./utils/api');

App({
  onLaunch: function() {
    // 检查是否已经授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，先获取openid和unionId
          this.globalData.needAuth = false;
          this.login();
        } else {
          // 未授权，标记需要显示授权提示
          this.globalData.needAuth = true;
          console.log('未授权，需要显示授权提示');
        }
      }
    });
  },
  
  login: function() {
    // 调用微信登录接口获取code
    wx.login({
      success: res => {
        if (res.code) {
          // 发送code到后端获取openid和unionId
          this.getOpenIdAndUnionId(res.code);
        } else {
          console.log('登录失败', res.errMsg);
        }
      },
      fail: err => {
        console.log('登录失败', err);
      }
    });
  },
  
  getOpenIdAndUnionId: function(code) {
    // 使用统一的接口管理文件调用后端接口
    api.auth.login(code)
      .then(res => {
        if (res.success) {
          const { openid, unionid } = res.data;
          // 存储openid和unionId
          wx.setStorageSync('openid', openid);
          wx.setStorageSync('unionid', unionid);
          // 获取用户信息
          this.getUserInfo();
        } else {
          console.log('获取openid失败', res.message);
        }
      })
      .catch(err => {
        console.log('获取openid失败', err);
      });
  },
  
  getUserInfo: function() {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo;
        this.globalData.needAuth = false;
        // 发送用户信息到后端接口
        this.sendUserInfoToBackend(res.userInfo);
      },
      fail: err => {
        console.log('获取用户信息失败', err);
      }
    });
  },
  
  sendUserInfoToBackend: function(userInfo) {
    // 使用统一的接口管理文件调用后端接口
    const data = {
      openid: wx.getStorageSync('openid'),
      unionid: wx.getStorageSync('unionid'),
      ...userInfo
    };
    
    api.auth.submitUserInfo(data)
      .then(res => {
        console.log('发送用户信息成功', res);
      })
      .catch(err => {
        console.log('发送用户信息失败', err);
      });
  },
  
  sendPhoneCodeToBackend: function(code) {
    // 使用统一的接口管理文件调用后端接口
    api.auth.submitPhoneCode(code)
      .then(res => {
        console.log('发送手机号授权code成功', res);
      })
      .catch(err => {
        console.log('发送手机号授权code失败', err);
      });
  },
  
  globalData: {
    userInfo: null,
    needAuth: true
  }
});
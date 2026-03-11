// components/auth-modal/auth-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPhoneModal: false,
    userInfo: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal: function() {
      // 关闭手机号授权模态框
      this.setData({
        showPhoneModal: false
      });
      // 触发关闭事件
      this.triggerEvent('close');
    },
    
    getUserInfo: function(e) {
      if (e.detail.userInfo) {
        // 用户授权微信信息成功，存储用户信息
        this.setData({
          userInfo: e.detail.userInfo
        });
        // 触发成功事件
        this.triggerEvent('success', e.detail.userInfo);
        // 显示手机号授权提示
        this.setData({
          showPhoneModal: true
        });
      } else {
        // 用户拒绝授权
        this.triggerEvent('fail');
      }
    },
    
    getPhoneNumber: function(e) {
      if (e.detail.code) {
        // 用户授权手机号成功，获取到code
        this.triggerEvent('phoneSuccess', e.detail.code);
        // 关闭手机号授权提示
        this.setData({
          showPhoneModal: false
        });
        // 关闭整个授权提示
        this.hideModal();
      } else {
        // 用户拒绝授权手机号
        this.triggerEvent('phoneFail');
        // 关闭手机号授权提示
        this.setData({
          showPhoneModal: false
        });
      }
    }
  }
})
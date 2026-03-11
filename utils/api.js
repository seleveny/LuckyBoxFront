// utils/api.js
// 统一的接口管理文件

const API_BASE_URL = 'https://api.example.com'; // 实际项目中替换为真实的API基础地址

// 封装请求方法
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

// 微信登录相关接口
const authApi = {
  // 通过code获取openid和unionId
  login: (code) => {
    return request('/user/login', 'POST', { code });
  },
  
  // 提交用户信息
  submitUserInfo: (userInfo) => {
    return request('/user/info', 'POST', userInfo);
  },
  
  // 提交手机号授权code
  submitPhoneCode: (code) => {
    return request('/user/phone', 'POST', { code, openid: wx.getStorageSync('openid') });
  }
};

// 导出所有接口
module.exports = {
  auth: authApi
};


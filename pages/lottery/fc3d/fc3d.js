// pages/lottery/fc3d/fc3d.js
Page({
  data: {
    lotteryData: []
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


})
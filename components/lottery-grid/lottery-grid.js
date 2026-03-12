// components/lottery-grid/lottery-grid.js
const { lotteryTypes } = require('../../config/lottery.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 可以接收外部传入的彩票类型数据
    types: {
      type: Array,
      value: lotteryTypes
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLotteryTap: function(e) {
      const { index } = e.currentTarget.dataset;
      const lottery = this.data.types[index];
      
      // 触发点击事件，传递彩票类型数据
      this.triggerEvent('lotteryTap', lottery);
    }
  }
});

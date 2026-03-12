// config/lottery.js
// 彩票类型配置 - 精心设计的渐变背景和样式

const lotteryTypes = [
  {
    id: 'fc3d',
    name: '福彩3D',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    shadow: 'rgba(255, 107, 107, 0.4)',
    icon: '🎲',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/fc3d/fc3d',
    description: '三位数字，梦想起航'
  },
  {
    id: 'pl3',
    name: '排列三',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    shadow: 'rgba(78, 205, 196, 0.4)',
    icon: '🎯',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/pl3/pl3',
    description: '精准排列，好运连连'
  },
  {
    id: 'ssq',
    name: '双色球',
    gradient: 'linear-gradient(135deg, #FF1744 0%, #F50057 100%)',
    shadow: 'rgba(255, 23, 68, 0.4)',
    icon: '🔴',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/ssq/ssq',
    description: '红蓝搭配，大奖相随'
  },
  {
    id: 'dlt',
    name: '大乐透',
    gradient: 'linear-gradient(135deg, #00E676 0%, #00C853 100%)',
    shadow: 'rgba(0, 230, 118, 0.4)',
    icon: '💰',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/dlt/dlt',
    description: '超级大乐透，财富自由'
  },
  {
    id: 'pl5',
    name: '排列五',
    gradient: 'linear-gradient(135deg, #2979FF 0%, #2962FF 100%)',
    shadow: 'rgba(41, 121, 255, 0.4)',
    icon: '🎰',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/pl5/pl5',
    description: '五位数字，精准命中'
  },
  {
    id: 'kl8',
    name: '快乐8',
    gradient: 'linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)',
    shadow: 'rgba(255, 145, 0, 0.4)',
    icon: '🎱',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/kl8/kl8',
    description: '快乐选号，惊喜无限'
  },
  {
    id: 'qxc',
    name: '七星彩',
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
    shadow: 'rgba(156, 39, 176, 0.4)',
    icon: '⭐',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/qxc/qxc',
    description: '七星高照，好运连连'
  },
  {
    id: 'qlc',
    name: '七乐彩',
    gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
    shadow: 'rgba(233, 30, 99, 0.4)',
    icon: '🌈',
    iconBg: 'rgba(255, 255, 255, 0.2)',
    page: '/pages/lottery/qlc/qlc',
    description: '七彩乐透，梦想成真'
  }
];

module.exports = {
  lotteryTypes
};

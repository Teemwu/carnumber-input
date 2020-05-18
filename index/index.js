// index/index.js
Page({
  data: {
    isShowKB: false,
    placeholder: '京A66666'
  },
  showKB() {
    this.setData({
      isShowKB: true
    })
  },
  confirm(e) {
    console.log(e.detail);
    this.setData({
      placeholder: e.detail
    })
  }
})
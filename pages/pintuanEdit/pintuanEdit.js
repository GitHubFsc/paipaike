// pages/enterForEdit/enterForEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ipt_length: 0,
    show: ['显示', '不显示'],
    encrypty: ['加密', '不加密']
  },

  lengthChange(e) {
    // console.log(e.detail.cursor)
    let ipt_length = e.detail.cursor;
    this.setData({
      ipt_length
    })
  },
  index: null,
  ide: null,
  handleRadioChange(e) {
    // console.log(e)
    this.index = e.detail.value;
    
  },

  saveChange() {
    wx.navigateBack({
      delta: 1
    });
  }
  
})
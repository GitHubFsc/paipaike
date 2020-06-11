const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;

// pages/promoteDetail/promoteDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    enrollList: [],
    banner: '',
    title: '',
    capacity: 0,
    view_num: 0,
    enrollNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.checkAuth()
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadData() {
    let that = this
    http.getReq('/api/Activity/Detail?id=' + that.data.id, null, (res) => {
      if (res.ErrCode == 0) {
        let data = res.Response
        that.setData({
          banner: data.activity.banner_image,
          title: data.activity.title,
          capacity: data.activity.group_course_capacity,
          view_num: data.viewNum,
          enrollList: data.enrollList,
          enrollNum:data.enrollNum
        })
      } else {
        tips.error(res.ErrMsg)
      }
    })
  }
})
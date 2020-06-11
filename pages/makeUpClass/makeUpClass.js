// pages/makeUpClass/makeUpClass.js
const http = require('../../utils/http.js');
const util = require('../../utils/util.js');
const app = getApp();
import tips from '../../utils/tips.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    currentIndex: 0,
    checkedId : null,
    id: 0,
    scheduleArray: [],
    courseId:0,
    leaveDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.checkAuth()
    this.setData({
      id: options.id,
      courseId:options.courseId
    })
  },

  addClass: function () {
    let data=this.data;
    wx.navigateTo({
      url: '/pages/addBukeClass/addBukeClass?scheduleStudentId='+data.id,
    })
  },

  noClassAdd: function () {
    let data=this.data;
    wx.navigateTo({
      url: '/pages/addBukeClass/addBukeClass?scheduleStudentId='+data.id,
    })
  },

  studentTime: function () {
    let orgId=wx.getStorageSync('orgId')
    let scheduleStuId=this.data.id
    let scheduleId=this.data.checkedId;
    if(scheduleId){
      http.postReq('/api/ScheduleStudent/Make',{orgId:orgId,scheduleStuId:scheduleStuId,scheduleId:scheduleId},null,(res)=>{
        if(res.ErrCode==0){
          wx.showToast({
            title: '排课成功',
            success(){
              wx.navigateBack({
                // url: '/pages/studentTime/studentTime',
                delta: 1
              })
            }
          })
        }else{
          tips.error(res.ErrMsg)
        }
      })
    }else{
      wx.showToast({
        title: '请选择补课班级',
        icon :'none'
      })
    }
  },
  radioChange(e){
    this.setData({
      checkedId : e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id);
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
  /**
   * 控制按钮是否选中
   */
  changeChecked: function (e) {
    this.setData({
      checkedId : e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id);
  },
  loadData() {
    let that = this
    let orgId = wx.getStorageSync('orgId')
    http.getReq('/api/CourseSchedule/GetList?orgId=' + orgId + "&mode=2&scheduleStudentId="+that.data.id, null, (res) => {
      if (res.ErrCode == 0) {
        let scheduleArray=res.Response;
        if(scheduleArray.length>0){
          
        }
        that.setData({
          scheduleArray: res.Response
        })
      } else {
        tips.error(res.ErrMsg)
      }
    })
  }
})
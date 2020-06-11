// pages/letterDetail/letterDetail.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        student_name: '',
        content: ''
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
        http.getReq('/api/Notice/Get?id=' + that.data.id, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    student_name: res.Response.student_name,
                    content: res.Response.content
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    }
})
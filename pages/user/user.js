const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image: '',
        name: '',
        schoolName: ''
    },

    setting: function () {
        wx.navigateTo({
            url: '/pages/set/set',
        })
    },

    bukeInfo: function () {
        wx.navigateTo({
            url: '/pages/bukeInfo/bukeInfo',
        })
    },

    jgPage: function () {
        wx.navigateTo({
            url: '/pages/jgPage/jgPage',
        })
    },

    // 账号分配
    accountAssignment: function () {
        wx.navigateTo({
            url: '/pages/addTeacher/addTeacher',
        })
    },

    selectWork: function () {
        wx.navigateTo({
            url: '/pages/selectWork/selectWork',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
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
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Organ/Get?id=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    image: res.Response.imagePath,
                    name: res.Response.name,
                    schoolName: res.Response.schoolName
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    }
})
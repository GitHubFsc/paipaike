// pages/noticeList/noticeList.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartData: []
    },
    editNotice(e) {
        wx.navigateTo({
            url: '/pages/enrollActivity/enrollActivity?id=' + e.currentTarget.dataset.id
        })
    },
    addNotice: function () {
        wx.navigateTo({
            url: '/pages/enrollActivity/enrollActivity?id=0',
        })
    },

    deleteNotice: function (e) {
        let id = e.currentTarget.dataset.id
        let that = this
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Notice/Remove?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            tips.success('删除成功')
                            that.loadData()
                        } else {
                            tips.error(res.ErrMsg)
                        }
                    })
                }
            }
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
        http.getReq('/api/Notice/GetList?mode=0&orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    cartData: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    }
})
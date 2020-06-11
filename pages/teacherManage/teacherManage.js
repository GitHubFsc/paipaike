// pages/teacherManage/teacherManage.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        keyword: '',
        checked: true,
        contents: "15515517726"
    },
    loadData() {
        let that = this;
        let keyword = that.data.keyword
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Teacher/GetList?orgId=' + orgId + '&keyword=' + keyword, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    items: res.Response
                })
            } else {
                tips.error(res.ErrMsg);
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
    },

    //删除教师
    deleteTeacher: function (e) {
        let that = this;
        let id = e.currentTarget.dataset.id
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Teacher/Remove?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            that.loadData()
                        }
                    })
                }
            }
        })
    },
    searchFn(e) {
        let value = e.detail.value;
        this.setData({
            keyword: value
        })
        this.loadData()
    },
    addTeacher: function () {
        wx.navigateTo({
            url: '/pages/addTeacher/addTeacher',
        })
    },

    editTeacher: function (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/addTeacher/addTeacher?id=' + id,
        })
    },

    editImg: function () {

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

    }
})
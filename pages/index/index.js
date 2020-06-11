const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        circular: true,
        interval: 5000,
        duration: 1000
    },

    showModal: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-in-out",
            delay: 0
        })
        this.animation = animation
        animation.translateY(500).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    hideModal: function () {
        this.setData({
            showModalStatus: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    login() {
        wx.login({
            success: (res) => {
                console.log(res.code)
                http.getReq('/api/Organ/GetOrganId?code=' + res.code, null, (res) => {
                    if (res.ErrCode == 0) {
                        wx.setStorageSync('orgId', res.Response.id)
                    }
                })
            },
        })
    },

    addCourseInfo: function () {
        wx.navigateTo({
            url: '/pages/addCourseList/addCourseList',
        })

    },

    teacherManage: function () {
        wx.navigateTo({
            url: '/pages/teacherManage/teacherManage',
        })
    },

    studentManage: function () {
        wx.navigateTo({
            url: '/pages/handleManage/handleManage',
        })
    },

    releaseListen: function () {
        wx.navigateTo({
            url: '/pages/listenList/listenList',
        })
    },

    chartList: function () {
        wx.navigateTo({
            // url: '/pages/chart/chart',
            url: '/pages/chartPage/chartPage',
        })
    },

    enrollActivity: function () {
        wx.navigateTo({
            // url: '/pages/enrollActivity/enrollActivity',
            url: '/pages/enrollPage/enrollPage',
        })
    },

    fromLetter: function () {
        wx.navigateTo({
            url: '/pages/letter/letter',
        })
    },
    notify: function () {
        wx.navigateTo({
            url: '/pages/noticeList/noticeList',
        })
    },

    leaveManager: function () {
        wx.navigateTo({
            url: '/pages/leaveManager/leaveManager',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    loadData() {
        let that = this
        http.getReq('/api/Category/GetList?parentId=4', null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    imgUrls: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.login();
        wx.showTabBar()
        this.loadData()
        //let orgId = wx.getStorageSync('orgId')

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
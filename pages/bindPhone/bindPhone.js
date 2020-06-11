// pages/bindPhone/bindPhone.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true, //控制下拉列表的显示隐藏，false隐藏、true显示
        jzArray: [], //下拉列表的数据
        index: 0, //选择的下拉列表下标
        checked: false,
        studentId: 0,
        studentName: '',
        id: 0,
        phone: '',
        identity_id: 0
    },

    confirmBind: function () {
        let data = this.data
        if (!data.phone) {
            tips.alert('电话不能为空')
            return;
        }
        http.postReq('/api/Parent/AddOrUpdate', {
            studentId: data.studentId,
            identityId: data.jzArray[data.index].id,
            phone: data.phone,
            id: data.id
        }, null, (res) => {
            if (res.ErrCode == 0) {
                tips.success('提交成功')
                // var pages = getCurrentPages(); //当前页面
                // var prevPage = pages[pages.length - 2]; //上个页面
                // prevPage.setData({
                //     id: data.studentId
                // })
                wx.navigateBack({
                    delta: 2
                });
            } else {
                tips.error(res.ErrMsg)
            }
        })
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail',
        })
    },

    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    submitAllocation: function () {
        wx.navigateTo({
            url: '/pages/teacherManage/teacherManage',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        this.setData({
            id: options.id,
            studentId: options.studentId
        })
        this.loadData()
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
        let id = that.data.id
        let studentId = that.data.studentId
        http.getReq('/api/Parent/Get?id=' + id + '&studentId=' + studentId, null, (res) => {
            if (res.ErrCode == 0) {
                for (let i in res.Response.identityList) {
                    if (res.Response.identityId == res.Response.identityList[i].id) {
                        that.data.index = i
                    }
                }
                that.setData({
                    index: that.data.index,
                    jzArray: res.Response.identityList,
                    phone: res.Response.phone,
                    studentId: res.Response.studentId,
                    id: res.Response.id,
                    studentName: res.Response.studentName
                })
            }
        })
    },
    phoneInput(e) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(e.detail.value)) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'none',
                duration: 1500
            })
            this.setData({
                phone: null
            })
        } else {
            this.setData({
                phone: e.detail.value
            })
        }
    },
})
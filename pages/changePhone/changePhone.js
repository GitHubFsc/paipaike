// pages/changePhone/changePhone.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        code: ''
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
    codeInput(e) {
        this.setData({
            code: e.detail.value
        })
    },
    getNumberFn() {
        let data = this.data
        if (!data.phone) {
            tips.error('手机号不能为空')
            return
        }
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/Organ/VerifyCode', {
            phone: data.phone,
            id: orgId
        }, null, (res) => {
            if (res.ErrCode == 0) {
                tips.success('发送成功')

            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    submitAdd() {
        let data = this.data
        if (!data.phone) {
            tips.error('手机号不能为空')
            return
        }
        if (!data.code) {
            tips.error('验证码不能为空')
            return
        }
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/Organ/UpdatePhone', {
            id: orgId,
            phone: data.phone,
            code: data.code
        }, null, (res) => {
            if (res.ErrCode == 0) {
                wx.showToast({
                    title: '修改成功',
                    success() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                })

            } else {
                tips.error(res.ErrMsg)
            }
        })
    }
})
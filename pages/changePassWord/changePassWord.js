// pages/changePassWord/changePassWord.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        password: '',
        newPassword: '',
        rePassword: ''
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
    submitAdd() {
        let data = this.data
        if (!data.password) {
            tips.alert('原密码不能为空')
            return
        }
        if (!data.newPassword) {
            tips.alert('新密码不能为空')
            return
        }
        if (!data.rePassword) {
            tips.alert('确认密码不能为空')
            return
        }
        let id = wx.getStorageSync('orgId')
        http.postReq('/api/Organ/UpdatePwd', {
            id: id,
            password: data.password,
            newPassword: data.newPassword,
            rePassword: data.rePassword
        }, null, (res) => {
            if (res.ErrCode == 0) {
                tips.success('修改成功')
                wx.navigateBack({
                    delta: 1
                });
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    passwordInput(e) {
        this.setData({
            password: e.detail.value
        })
    },
    newPasswordInput(e) {
        this.setData({
            newPassword: e.detail.value
        })
    },
    rePasswordInput(e) {
        this.setData({
            rePassword: e.detail.value
        })
    }
})
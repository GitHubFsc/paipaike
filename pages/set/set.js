// pages/set/set.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    aboutUs:function(){
        wx.navigateTo({
            url: '/pages/aboutUs/aboutUs',
        })
    },

    outLogin: function(){
        let isTch=wx.getStorageSync('isTch');
        wx.login({
            success: (res) => {
                console.log(res.code)
                http.getReq('/api/Organ/RemoveOpenId?code=' + res.code+"&isTch="+isTch, null, (res) => {
                    if (res.ErrCode == 0) {
                        wx.removeStorageSync('orgId')
                        wx.removeStorageSync('isTch')
                        wx.navigateTo({
                            url: '/pages/login/login',
                        })
                    } else{
                        tips.error(res.ErrMsg)
                    }
                })
            },
        })
     
    },

    changePassWord: function(){
        wx.navigateTo({
            url: '/pages/changePassWord/changePassWord',
        })
    },

    changePhone:function(){
        wx.navigateTo({
            url: '/pages/changePhone/changePhone',
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
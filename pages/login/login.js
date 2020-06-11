// pages/login/login.js
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
        name: '',
        address: '',
        userName: '',
        password: '',
        loginUserName: '',
        loginPassword: '',
        openid: ''
    },

    loginFn: function () {
        let data = this.data
        if (!data.loginUserName) {
            tips.alert('手机号码不能为空')
            return
        }
        if (!data.loginPassword) {
            tips.alert('密码不能为空')
            return
        }
        http.postReq('/api/Organ/Login', {
            userName: data.loginUserName,
            password: data.loginPassword,
            openId: data.openid
        }, null, (res) => {
            if (res.ErrCode == 0) {
                tips.success('登录成功')
                wx.setStorage({
                    data: res.Response.id,
                    key: 'orgId',
                })
                wx.setStorageSync('isTch', res.Response.is_tch)
                wx.switchTab({
                    url: '/pages/index/index',
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })

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
    hideModal() {
        this.setData({
            showModalStatus: false
        })
    },
    registerFn: function () {
        let that = this
        if (!that.data.showModalStatus) {
            return;
        }
        let data = that.data;
        if (!data.userName) {
            tips.alert('手机号码不能为空')
            return
        }
        if (data.userName.length != 11) {
            tips.alert('手机号码不正确')
            return
        }
        if (!data.password) {
            tips.alert('密码不能为空')
            return
        }

        if (!data.name) {
            tips.alert('名称不能为空')
            return
        }
        if (!data.address) {
            tips.alert('地址不能为空')
            return
        }
        if (!data.phone) {
            tips.alert('联系电话不能为空')
            return
        }
        http.postReq('/api/Organ/Register', {
            phone: data.phone,
            name: data.name,
            address: data.address,
            userName: data.userName,
            password: data.password
        }, null, (res) => {
            if (res.ErrCode == 0) {
                tips.success('注册成功')
                that.setData({
                    showModalStatus: false
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.login()
    },
    login() {
        let that = this
        wx.login({
            success: (res) => {
                console.log(res.code)
                http.getReq('/api/Organ/GetOpenId?code=' + res.code, null, (res) => {
                    if (res.ErrCode == 0) {
                        that.setData({
                            openid: res.Response
                        })
                    }
                })
            },
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
        this.setData({
            phone: e.detail.value
        })
    },
    nameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    addressInput(e) {
        this.setData({
            address: e.detail.value
        })
    },
    userNameInput(e) {
        var myreg = /^1[3456789]\d{9}$/;
        if (!myreg.test(e.detail.value)) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'none',
                duration: 1500
            })
            this.setData({
                userName: null
            })
        } else {
            this.setData({
                userName: e.detail.value
            })
        }
    },
    passwordInput(e) {
        this.setData({
            password: e.detail.value
        })
    },
    loginUserNameInput(e) {
        this.setData({
            loginUserName: e.detail.value
        })
    },
    loginPasswordInput(e) {
        this.setData({
            loginPassword: e.detail.value
        })
    }
})
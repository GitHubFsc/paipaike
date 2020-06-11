// pages/addCourseInfo/addTeacher.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: {
            mc: "少儿英语",
            xq: "课程详情,课程详情",
            nr: "课程内容,课程内容",
            ts: "课程特色说明",
            sh: "1-3岁",
        },

        index: 0,
        checked: false,
        value: ['1', '2', '3'],
        items: [{
            name: '1',
            value: '班级1'
        }, {
            name: '2',
            value: '班级2'
        }, {
            name: '3',
            value: '班级3'
        }, {
            name: '4',
            value: '班级4'
        }, {
            name: '5',
            value: '班级5'
        }]

    },

    bindSelectorChange(e) {
        this.setData({
            value: e.detail.value
        })
    },

    onModalOpen() {

    },
    onModalClose() {

    },

    bindDateChange: function (e) {
        this.setData({
            index: e.detail.value
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
    hideModal: function () {
        this.setData({
            showModalStatus: false,
        })
    },
    submitEdit: function () {
        wx.navigateTo({
            url: '/pages/addCourseList/addCourseList',
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
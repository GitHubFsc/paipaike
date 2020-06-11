// pages/releaseListen/releaseListen.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true,//控制下拉列表的显示隐藏，false隐藏、true显示
        index: 0,//选择的下拉列表下标
        kcIndex: 0,
        jsIndex: 0,
        teacherIndex: 0,
        checked: false,
        array: ['班级1', '班级2', '班级3', '班级4'],
        classRoomArray: ['教室1', '教室2', '教室3', '教室4'],
        teacherArray: ['教师1', '教师2', '教师3', '教师4'],
        date: '2016-09-01',
        startDate: '0:00',
        endDate: '24:00'
    },

    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },

    bindStartDateChange: function (e) {
        this.setData({
            startDate: e.detail.value
        })
    },
    bindEndDateChange: function (e) {
        this.setData({
            endDate: e.detail.value
        })
    },

    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    bindJSPickerChange: function (e) {
        this.setData({
            jsIndex: e.detail.value
        })
    },

    bindTeaPickerChange: function (e) {
        this.setData({
            teacherIndex: e.detail.value
        })
    },

    submitForm: function () {
        wx.switchTab({
            url: '/pages/courseList/courseList',
        })
    },

    // 点击下拉列表
    optionTap(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index: Index,
            show: !this.data.show
        });
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
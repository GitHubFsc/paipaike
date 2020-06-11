// pages/addCourseInfo/addTeacher.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: {
            mc: "少儿英语",
            xq: "课程详情,课程详情",
            nr: "张小鹏",
            ts: "课程特色说明",
            sj: "2019-11-20",
            bj:"普通班"
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

    confirm(e) {
       wx.navigateTo({
           url: '/pages/bukeInfo/bukeInfo',
       })
    },

    onModalOpen() {

    },
    onModalClose() {

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
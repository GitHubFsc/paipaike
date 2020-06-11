// pages/addCourseInfo/addCourseInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        xueyuanDate:[
            {
                id:'1',
                name:'张三三',
                phone:'155 166 18876'
            },
            {
                id: '2',
                name: '张小小',
                phone: '155 166 18876'
            },
            {
                id: '3',
                name: '张大大',
                phone: '155 166 18876'
            },
            {
                id: '4',
                name: '李思思',
                phone: '155 166 18876'
            },
            {
                id: '5',
                name: '王呜呜',
                phone: '155 166 18876'
            }

        ]
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
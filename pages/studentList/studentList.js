// pages/studentManage/studentManage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        studentList: [
            {
                id:'1',
                name:'小A',
                engName:'Amy'
            },
            {
                id: '2',
                name: '小B',
                engName: 'Bob'
            },
            {
                id: '3',
                name: '小C',
                engName: 'Candy'
            },
            {
                id: '4',
                name: '小D',
                engName: 'Danio'
            },

        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        let that = this
        that.setData({
            paramFlag: options.flag
        })
        console.log(this.data.paramFlag);
    },

    chartDetail: function () {
        wx.navigateTo({
            url: '/pages/chart/chart',
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

    }
})
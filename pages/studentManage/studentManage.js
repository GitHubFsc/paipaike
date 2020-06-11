// pages/studentManage/studentManage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        paramFlag:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        let that = this
        that.setData({
            paramFlag:options.flag
        })
        console.log(this.data.paramFlag);
    },

    studentDetail:function(){
        console.log(this.data.paramFlag)
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail?flag='+this.data.paramFlag+'',
        })
    },

    addStudent:function(){
        wx.navigateTo({
            url: '/pages/addStudent/addStudent?flag=' + this.data.paramFlag +'',
        })
    },

    selectStu:function(){
        wx.navigateTo({
            url: '/pages/groupsend/groupsend',
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
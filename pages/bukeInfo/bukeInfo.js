
const app = getApp()

Page({
    data: {
        show: true,
        heiNum: "560rpx",
        navData: [
            {
                text: '请假'
            },
            {
                text: '待签到'
            }
        ],
        currentTab: 0,
        navScrollLeft: 0
    },
    //事件处理函数
    onLoad: function () {
        http.checkAuth()
    },

    bukeDetail: function () {
        wx.navigateTo({
            url: '/pages/bukeDetail/bukeDetail',
        })
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    }
})
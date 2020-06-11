//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        heiNum:"2317rpx",
        navData: [
            {
                text: '列表1'
            },
            {
                text: '列表2'
            },
            {
                text: '列表3'
            },
            {
                text: '列表4'
            },
            {
                text: '列表5'
            }
        ],
        currentTab: 0,
        navScrollLeft: 0
    },
    //事件处理函数
    onLoad: function () {
        http.checkAuth()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }


        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        })
    },


    switchNav(event) {
        var cur = event.currentTarget.dataset.current;
        var singleNavWidth = this.data.windowWidth / 2;
        this.setData({
            navScrollLeft: (cur-1) * singleNavWidth
        })
        if (cur == 0){
            this.setData({
                heiNum: "2317rpx"
            })
        }
        if (cur == 1){
            this.setData({
                heiNum: "2235rpx"
            })
        }
        if (cur == 2){
            this.setData({
                heiNum: "2476rpx"
            })
        }
        if (cur == 3){
            this.setData({
                heiNum: "2275rpx"
            })
        }
        if (cur == 4){
            this.setData({
                heiNum: "2494rpx"
            })
        }

        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    switchTab(event) {
        var cur = event.detail.current;
        var singleNavWidth = this.data.windowWidth / 2;
        if (cur == 0) {
            this.setData({
                heiNum: "2317rpx"
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "2235rpx"
            })
        }
        if (cur == 2) {
            this.setData({
                heiNum: "2476rpx"
            })
        }
        if (cur == 3) {
            this.setData({
                heiNum: "2275rpx"
            })
        }
        if (cur == 4) {
            this.setData({
                heiNum: "2494rpx"
            })
        }
        
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 1) * singleNavWidth
        });
    },
    
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    }
})
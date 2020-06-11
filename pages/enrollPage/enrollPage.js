// pages/enrollPage/enrollPage.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        heiNum: "100%",
        currentTab: 0,
        navScrollLeft: 0,
        show_chekitem: false, // 显示复选框按钮
        cartData: [{
                id: '1',
                name: "模版1",
                image: "../../images/background-3.jpg",
                desc: "拼团模版"
            },
            {
                id: '2',
                name: "模版2",
                image: "../../images/background-2.jpg",
                desc: "拼团模版"
            },
            {
                id: '3',
                name: "模版3",
                image: "../../images/background-1.jpg",
                desc: "报名模版"
            },
        ],
        navData: [{
                text: '我的推广'
            },
            {
                text: '活动模板'
            },
            // {
            //     text: '推广设置'
            // }
        ],
        date: '2019-11-20',
        activityArray: [],
        idArray: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
    },
    onShow() {
        this.loadData()
    },
    takeFn(e) {
        let that = this
        let id = e.currentTarget.dataset.id
        let mode = e.currentTarget.dataset.mode
        http.getReq('/api/Activity/Take?mode=' + mode + "&id=" + id, null, (res) => {
            if (res.ErrCode == 0) {
                that.loadData();
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    switchNav(event) {
        var cur = event.currentTarget.dataset.current;
        var singleNavWidth = this.data.windowWidth / 3;
        this.setData({
            navScrollLeft: (cur - 1) * singleNavWidth
        })
        if (cur == 0) {
            this.setData({
                heiNum: "100%"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "1400rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 2) {
            this.setData({
                heiNum: "8500rpx"
            })
            this.setData({
                show: false
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
        var singleNavWidth = this.data.windowWidth / 3;
        if (cur == 0) {
            this.setData({
                heiNum: "100%"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "1400rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 2) {
            this.setData({
                heiNum: "8500rpx"
            })

            this.setData({
                show: false
            })
        }

        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 1) * singleNavWidth
        });
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },


    // tuiguangSet: function() {
    //     wx.navigateTo({
    //         url: '/pages/activityTemp/activityTemp',
    //     })
    // },

    pinTuanTemp: function () {
        wx.navigateTo({
            url: '/pages/pinTuanTemp/pinTuanTemp',
        })
    },
    editTemp: function () {
        wx.navigateTo({
            url: '/pages/pinTuanTemp/pinTuanTemp',
        })
    },
    baoMingTemp: function () {
        wx.navigateTo({
            url: '/pages/baoMingTemp/baoMingTemp',
        })
    },

    deleteTemp: function () {

    },
    goPromotePage(e) {
        console.log(e)
        wx.navigateTo({
            url: '/pages/promoteDetail/promoteDetail?id=' + e.currentTarget.dataset.id,
        });
    },

    /* 
        管理活动
    */
    manageItem() {
        let show_chekitem = !this.data.show_chekitem
        this.setData({
            show_chekitem
        })
    },

    /* 
        复选框状态改变
    */
    handleItemChange(e) {
        let item = e.detail.value
        let index = e.currentTarget.dataset.index
        if (item.length > 0) {
            this.data.idArray.push(item[0])
        } else {
            this.data.idArray=this.data.idArray.splice(index, 1)
        }
        this.setData({
            idArray: this.data.idArray
        })
    },


    /* 
        删除活动
    */
    deleteItem() {
        let that = this
        let ids = this.data.idArray.join(',');
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Activity/Remove?ids=' + ids, null, (res) => {
                        if (res.ErrCode == 0) {
                            wx.showToast({
                                title: '删除成功',
                                success() {
                                    that.loadData()
                                }
                            })
                        } else {
                            tips.error(res.ErrMsg)
                        }
                    })
                }
            }
        })
    },
    loadData() {
        let that = this
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Activity/GetList?orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    activityArray: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    }

})
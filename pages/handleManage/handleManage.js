// pages/handleManage/handleManage.js
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
        heiNum: "800rpx",
        currentTab: 0,
        keyword:'',
        navScrollLeft: 0,
        navData: [{
                text: '在读'
            },
            {
                text: '曾读'
            },
            {
                text: '意向'
            }
        ],

        zaiduList: [
        ]
    },

    switchNav(event) {
        var cur = event.currentTarget.dataset.current;
        var singleNavWidth = this.data.windowWidth / 2;
        this.setData({
            navScrollLeft: (cur - 1) * singleNavWidth
        })

        if (cur == 0) {
            this.setData({
                heiNum: "800rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "800rpx"
            })
            this.setData({
                show: false
            })
        }

        if (cur == 2) {
            this.setData({
                heiNum: "800rpx"
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
        var singleNavWidth = this.data.windowWidth / 2;
        if (cur == 0) {
            this.setData({
                heiNum: "800rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "800rpx"
            })

            this.setData({
                show: false
            })
        }

        if (cur == 2) {
            this.setData({
                heiNum: "800rpx"
            })

            this.setData({
                show: false
            })
        }

        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 1) * singleNavWidth
        });
        this.loadData()
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    loadData() {
        let that = this
        let orgId = wx.getStorageSync('orgId');
        http.getReq('/api/Student/GetList?orgId=' + orgId + '&mode='+that.data.currentTab+'&keyword='+that.data.keyword, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    zaiduList: res.Response
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
        http.checkAuth()
    },


    addStudentFn: function () {
        wx.navigateTo({
            url: '/pages/addStudent/addStudent?flag='+this.data.currentTab,
        })
    },
    // addStudentFn2: function () {
    //     wx.navigateTo({
    //         url: '/pages/addStudent/addStudent?flag='+this.data.currentTab,
    //     })
    // },
    // addStudentFn3: function () {
    //     wx.navigateTo({
    //         url: '/pages/addStudent/addStudent?flag='+this.data.currentTab,
    //     })
    // },

    selectStu: function () {
        wx.navigateTo({
            url: '/pages/groupsend/groupsend',
        })
    },


    studentDetailFn1: function (e) {
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail?flag='+this.data.currentTab+"&id="+id,
        })
    },
    studentDetailFn2: function (e) {
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail?flag='+this.data.currentTab+"&id="+id,
        })
    },
    studentDetailFn3: function (e) {
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail?flag='+this.data.currentTab+"&id="+id,
        })
    },

    // zaiduFn:function(){
    //     wx.navigateTo({
    //         url: '/pages/studentManage/studentManage?flag=1',
    //     })
    // },

    // cengduduFn:function(){
    //     wx.navigateTo({
    //         url: '/pages/studentManage/studentManage?flag=2',
    //     })
    // },
    // yixiangFn: function () {
    //     wx.navigateTo({
    //         url: '/pages/studentManage/studentManage?flag=3',
    //     })
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.loadData()
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
    searchFn(e) {
        let value = e.detail.value;
        this.setData({
            keyword: value
        })
        this.loadData()
    },
})
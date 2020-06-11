// pages/chartPage/chartPage.js
var wxCharts = require("../../utils/wxcharts.js");
var windowW = 0;
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
        navScrollLeft: 0,
        navData: [{
                text: '学员'
            },
            {
                text: '老师'
            },
            {
                text: '学校'
            }
        ],

        zaiduList: [{
                id: '1',
                name: '江小鹏',
                engName: 'EnglishName'
            },
            {
                id: '2',
                name: '张三',
                engName: 'EnglishName'
            },
            {
                id: '3',
                name: '李四',
                engName: 'EnglishName'
            },
            {
                id: '4',
                name: '王五',
                engName: 'EnglishName'
            },
            {
                id: '5',
                name: '赵六',
                engName: 'EnglishName'
            }
        ],

        className: ['英语课', '英语课', '英语课', '英语课', '英语课', '英语课'],
        studentArray: [],
        teacherArray: [],
        organArray: []
    },


    chartDetail: function () {
        wx.navigateTo({
            url: '/pages/chart/chart',
        })
    },

    teacherChartDetail: function () {
        wx.navigateTo({
            url: '/pages/teacherChart/teacherChart',
        })
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
                heiNum: "1800rpx"
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
                heiNum: "1800rpx"
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
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },

    studentList: function () {
        wx.navigateTo({
            url: '/pages/studentList/studentList',
        })
    },

    teacherList: function () {
        wx.navigateTo({
            url: '/pages/teacherList/teacherList',
        })
    },

    schoolChart: function () {
        wx.navigateTo({
            url: '/pages/schoolChart/schoolChart',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()

        // 屏幕宽度
        this.setData({
            imageWidth: wx.getSystemInfoSync().windowWidth
        });
        console.log(this.data.imageWidth);

        //计算屏幕宽度比列
        windowW = this.data.imageWidth / 375;
        console.log(windowW);
        this.loadData()
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

        //columnCanvas
        new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: ['1月', '2月', '3月', '4月'],
            series: [{
                    name: '总在读人数',
                    data: [50, 50, 60, 70],
                    color: "rgba(175,220,177,1)",
                    format: function (val, name) {
                        return val.toFixed(1) + '';
                    }
                }, {
                    name: '总课时',
                    data: [49, 16, 30, 28],
                    color: "rgba(149,167,231,1)"
                },
                {
                    name: '已消课时',
                    data: [4, 3, 5, 6],
                    color: "rgba(70,155,186,1)"
                },
                {
                    name: '未消课时',
                    data: [4, 3, 5, 6],
                    color: "rgba(5,94,127,1)"
                },
                {
                    name: '总奖励课时',
                    data: [1, 1, 1, 1],
                    color: "rgba(218,93,61,1)"
                }
            ],
            yAxis: {
                format: function (val) {
                    return val + '';
                },
                title: '',
                min: 0,
                gridColor: '#fff',

            },
            xAxis: {
                disableGrid: false,
                type: 'calibration',
            },
            extra: {
                column: {
                    width: 18
                }
            },
            width: (375 * windowW),
            height: (200 * windowW),
        });
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
    loadData() {
        let that = this
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Statistics/Student?orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    studentArray: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
        http.getReq('/api/Statistics/Teacher?orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    teacherArray: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
        http.getReq('/api/Statistics/Organ?orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    organArray: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    }
})
// pages/handleManage/handleManage.js
const http = require('../../utils/http.js');
const util = require('../../utils/util.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;

function getToday() {
    let date = new Date();
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

function getWeek() {
    let time = util.formatDate(new Date())
    return util.getDates(1, time)
}
Page({


    /**
     * 页面的初始数据
     */
    data: {
        showModalStatus: false,
        show: true,
        heiNum: "1600rpx",
        currentTab: 0,
        navScrollLeft: 0,
        leaveArray: [],
        navData: [{
                text: '安排补课'
            },
            {
                text: '补课学员'
            }
        ],

        zaiduList: [{
                id: '1',
                name: '江小鹏',
                engName: 'EnglishName'
            },
            {
                id: '2',
                name: 'AAA',
                engName: 'EnglishName'
            },
            {
                id: '3',
                name: 'BBB',
                engName: 'EnglishName'
            },
            {
                id: '4',
                name: 'CCC',
                engName: 'EnglishName'
            }
        ],
        week: getWeek()[0].week,
        month: getWeek()[0].time,
        cartData: [],
        studentArray: []
    },



    showModal: function (e) {
        let that = this
        let scheduleId = e.currentTarget.dataset.id
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/ScheduleStudent/GetList?scheduleId=' + scheduleId + '&orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    studentArray: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })

        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: "ease-in-out",
            delay: 0
        })
        this.animation = animation
        animation.translateY(500).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 300)

    },

    hideModal: function () {
        this.setData({
            showModalStatus: false,
        })
    },

    selectAttendance: function (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/studentTime/studentTime?id=' + id,
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
                heiNum: "1600rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "2500rpx"
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
                heiNum: "1600rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "2500rpx"
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        console.log(getWeek())
    },

    addStudentFn1: function () {
        wx.navigateTo({
            url: '/pages/addStudent/addStudent?flag=1',
        })
    },
    addStudentFn2: function () {
        wx.navigateTo({
            url: '/pages/addStudent/addStudent?flag=1',
        })
    },
    addStudentFn3: function () {
        wx.navigateTo({
            url: '/pages/addStudent/addStudent?flag=1',
        })
    },

    selectStu: function () {
        wx.navigateTo({
            url: '/pages/groupsend/groupsend',
        })
    },


    studentDetailFn1: function () {
        console.log(this.data.paramFlag)
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail?flag=1',
        })
    },
    studentDetailFn2: function () {
        console.log(this.data.paramFlag)
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail?flag=2',
        })
    },
    studentDetailFn3: function () {
        console.log(this.data.paramFlag)
        wx.navigateTo({
            url: '/pages/studentDetail/studentDetail?flag=3',
        })
    },
    //改变安排补课下方日期和星期
    change(event) {
        let date = new Date(event.detail.value);
        let week = util.getDates(1, date).map(item => {
            return item.week;
        })
        this.setData({
            month: event.detail.value,
            week: week
        })
         this.loadData();
    },
    onDayClick(event) {
        console.log(event);
        let clickTime = event.detail.id

        let weekTxt = util.getDates(1, clickTime);

        console.log(weekTxt)
        wx.showToast({
            title: clickTime,
            icon: 'none'
        })
        this.setData({
            month: clickTime
        })
        this.loadData()
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

    loadData() {
        let that = this
        let date = this.data.month
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/CourseSchedule/GetList?date=' + date + "&orgId=" + orgId + '&mode=1', null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    cartData: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
        http.getReq('/api/CourseSchedule/GetList?date=' + date + "&orgId=" + orgId + '&mode=2', null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    leaveArray: res.Response
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
})
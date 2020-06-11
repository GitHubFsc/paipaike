const http = require('../../utils/http.js');
const util = require('../../utils/util.js');
const app = getApp();
import tips from '../../utils/tips.js';

Page({
    data: {
        show: true,
        allInShow:true,
        heiNum: "560rpx",
        navData: [{
                text: '请假'
            },
            {
                text: '待签到'
            }
        ],
        currentTab: 0,
        navScrollLeft: 0,
        id: 0,
        className: '',
        courseName: '',
        start: '',
        end: '',
        teacherName: '',
        totalCount: 0,
        signCount: 0,
        leaveList:[],
        nosignList:[],
        signedList:[]
    },
    //事件处理函数
    onLoad: function (options) {
        http.checkAuth()
        this.setData({
            id: options.id
        })
    },
    onShow() {
        this.loadData()
        this.loadStudent()
    },
    goPaike: function (e) {
        wx.navigateTo({
            url: '/pages/makeUpClass/makeUpClass?id='+e.currentTarget.dataset.id+"&courseId="+this.data.id,
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
                heiNum: "560rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "700rpx"
            })
            if(this.data.nosignList.length==0){
                this.setData({
                    allInShow:true
                })
            }
            this.setData({
                show: false,
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
                heiNum: "560rpx"
            })
            this.setData({
                show: true
            })
        }
        if (cur == 1) {
            this.setData({
                heiNum: "700rpx"
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
    loadData() {
        let that = this
        let data = that.data
        let id = data.id
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/CourseSchedule/Get?id=' + id + '&orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    className: res.Response.className,
                    courseName: res.Response.courseName,
                    start: res.Response.start,
                    end: res.Response.end,
                    teacherName: res.Response.teacherName,
                    totalCount: res.Response.totalCount,
                    signCount: res.Response.signCount
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    loadStudent() {
        let that = this
        let data = that.data
        let id = data.id
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/ScheduleStudent/Get?scheduleId=' + id + '&orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                // if(res.Response.leaveList.length==0){
                //     that.data.show=true
                //     that.data.leaveShow=false
                // }else{
                //     that.data.show=false
                //     that.data.leaveShow=true
                // }
                that.setData({
                    leaveList : res.Response.leaveList,
                    nosignList: res.Response.nosignList,
                    signedList: res.Response.signedList
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    }
})
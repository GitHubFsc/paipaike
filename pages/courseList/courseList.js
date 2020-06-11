// pages/demo/calendar.js
const util = require('../../utils/util.js')
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;

function getToday() {
    let date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartData: [],
        showCalenderStatus: true,
        calenderHeight: 'auto',
        selectImg: '../../images/BTN.png',
        month: getToday()
    },

    change: function (evt) {
        let arr = evt.detail.value.split("-");
        console.log(arr)
        let month = arr.map(item=>{
            item = item.toString()
            return item[1] ? item : '0' + item
        }).join('-')
        this.setData({
            month: month
        });
        this.loadData()
    },

    // courseDetailShiTing:function(){
    //     wx.navigateTo({
    //         url: '/pages/',
    //     })
    // },

    showCalender: function () {
        if (this.data.showCalenderStatus == true) {
            this.setData({
                calenderHeight: '100rpx',
                showCalenderStatus: false,
                selectImg: '../../images/BTN.png'
            })
        } else {
            this.setData({
                calenderHeight: 'auto',
                showCalenderStatus: true,
                selectImg: '../../images/BTN.png'

            })
        }
    },

    addCourse: function () {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let time = y + "/" + m + "/" + d;
        time = new Date(time).getTime();
        let month = this.data.month.replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$1/$2/$3")
        month = new Date(month).getTime();
        if(month>=time){
            wx.navigateTo({
                url: '/pages/addCourseInfo/addCourseInfo?date='+this.data.month,
            })
        }else{
            wx.showToast({
              title: '请选择当前时间',
              icon : 'none'
            })
        }
        // wx.navigateTo({
        //     url: '/pages/addCourseInfo/addCourseInfo?date='+this.data.month,
        // })
    },

    courseDetail: function (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/courseDetail/courseDetail?id=' + id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        // var windowHeight = wx.getSystemInfoSync().windowHeight;
        // console.log(windowHeight);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.loadData()
    },

    onDayClick: function (event) {
        let clickTime = event.detail.id
        let weekTxt = util.getDates(1, clickTime);
        console.log(weekTxt)
        // wx.showToast({
        //     title: clickTime,
        //     icon: 'none'
        // })

        let curT = weekTxt[0].time + weekTxt[0].week;
        this.setData({
            curTime: curT
        })
    },

    onMonthChange: function (event) {
        console.log(event.detail)
        // wx.showToast({
        //     title: '月份变换',
        //     icon: 'none'
        // })
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
    }
})
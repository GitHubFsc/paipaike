// pages/demo/calendar.js
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        weekdays: ['周日', '一', '二', '三', '四', '五', '六'],
        daysStyle: [
            // 用于设置特殊日期显示标示
            // {
            //     id: '2019-10-31',
            //     style: 'background: #67C23A;color: #666; border-radius: 30px; color:#fff'
            // }
        ]
    },

    selectAttendance: function() {
        wx.navigateTo({
            url: '/pages/studentTime/studentTime',
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        http.checkAuth()
    },
    onDayClick: function(event) {
        console.log(event);
        let clickTime = event.detail.id

        let weekTxt = util.getDates(1, clickTime);

        console.log(weekTxt)

        wx.showToast({
            title: clickTime,
            icon: 'none'
        })
    },

    onMonthChange: function(event) {
        console.log(event.detail)

        wx.showToast({
            title: '月份变换',
            icon: 'none'
        })
    }
})
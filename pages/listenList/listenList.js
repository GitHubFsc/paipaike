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
        month: getToday(),
        cartData: []
    },

    addCourse: function () {
        wx.navigateTo({
            url: '/pages/addListenCourseInfo/addListenCourseInfo',
        })
    },

    onDayClick: function (event) {
        let clickTime = event.detail.id
        let weekTxt = util.getDates(1, clickTime);
        console.log(weekTxt)

        let curT = weekTxt[0].time + weekTxt[0].week;
        this.setData({
            curTime: curT
        })
    },
    change(e) {
        let arr = e.detail.value.split("-");
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
    courseDetail: function (e) {
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/listenDetail/listenDetail?id='+id,
        })
    },
    showCalender: function () {
        if (this.data.showCalenderStatus == true) {
            this.setData({
                calenderHeight: '100rpx',
                showCalenderStatus: false,
                selectImg: '../../images/open.png'
            })
        } else {
            this.setData({
                calenderHeight: 'auto',
                showCalenderStatus: true,
                selectImg: '../../images/open_pre.png'

            })
        }
    },
    copyCourse: function (e) {

        wx.setClipboardData({
            data: e.currentTarget.dataset.text,

            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({
                            title: '复制成功'
                        })
                    }
                })
            }

        })
    },
    deleteKeCheng: function () {
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {

            }
        })
    },

    addShiTing: function () {
        //获取复制内容
        wx.getClipboardData({
            success: function (res) {
                console.log(res.data)
            }
        })
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
                url: '/pages/addShiTing/addShiTing?date='+this.data.month,
            })
        }else{
            console.log(time);
            console.log(month);
            wx.showToast({
              title: '请选择当前时间',
              icon : 'none'
            })
        }
        
    },

    editCourse: function () {
        wx.navigateTo({
            url: '/pages/editCourse/editCourse',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
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
        http.getReq('/api/CourseSchedule/GetList?date=' + date + "&orgId=" + orgId + '&mode=0', null, (res) => {
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
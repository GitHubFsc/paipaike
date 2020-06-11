// pages/wxcharts/wxcharts.js
var wxCharts = require("../../utils/wxcharts.js");
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        http.checkAuth()
        // 屏幕宽度
        this.setData({
            imageWidth: wx.getSystemInfoSync().windowWidth
        });
        console.log(this.data.imageWidth);

        //计算屏幕宽度比列
        windowW = this.data.imageWidth / 375;
        console.log(windowW);

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //columnCanvas
        new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: ['少儿英语', '数学', '奥数', '围棋兴趣班'],
            series: [{
                name: '总课时',
                    data: [50, 50, 60, 70],
                    color: "rgba(175,220,177,1)",
                    format: function(val, name) {
                        return val.toFixed(1) + '';
                    }
                }, {
                    name: '已消课时',
                    data: [49, 16, 30, 28],
                    color: "rgba(149,167,231,1)"
                },
                {
                    name: '剩余课时',
                    data: [4, 3, 5, 6],
                    color: "rgba(70,155,186,1)"
                }
                ,
                {
                    name: '奖励课时',
                    data: [1, 1, 1, 1],
                    color: "rgba(218,93,61,1)"
                }
            ],
            yAxis: {
                format: function(val) {
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
})
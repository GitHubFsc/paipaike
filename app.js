//app.js

const http = require('utils/http.js');
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    globalData: {
        rootDocment: 'https://paikeapi.zztv021.com',
        //rootDocment: 'http://localhost:8000',
        toView: 0,
        gradeList : ['小班','中班','大班','一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二',
        '高三','大一','大二','大三','大四','成人']
    }
})
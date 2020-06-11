//var rootDocment = 'http://localhost:8000';
// var rootDocment = 'https://xcx.zhangqianit.com/cattle/public/api/';
var rootDocment = 'https://paikeapi.zztv021.com';
var header = {
    'content-type': 'application/json',
}

import tips from 'tips.js';
var tchArray = ["pages/handleManage/handleManage",
    "pages/addStudent/addStudent",
    "pages/studentDetail/studentDetail",
    "pages/bindPhone/bindPhone",
    "pages/listenList/listenList",
    "pages/addShiTing/addShiTing",
    "pages/listenDetail/listenDetail",
    "pages/editCourseList/editCourseList",
    "pages/courseList/courseList",
    "pages/addCourseInfo/addCourseInfo",
    "pages/editCourseList/editCourseList",
    "pages/leaveManager/leaveManager",
    "pages/studentTime/studentTime",
    "pages/makeUpClass/makeUpClass",
    "pages/addBukeClass/addBukeClass",
    "pages/user/user",
    "pages/set/set"
]
Array.prototype.contains = function (obj) { 
    var index = this.length; 
    while (index--) { 
         if (this[index] === obj) { 
             return true; 
         } 
    } 
    return false; 
    }
function checkAuth() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    var orgId = wx.getStorageSync('orgId')
    var isTch = wx.getStorageSync("isTch")
    if (!orgId) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
    } else {
        if(isTch&&!tchArray.contains(url)){
            wx.showModal({
                title: '401',
                content: '无访问权限',
                showCancel: false,
                success(res){
                    wx.navigateBack({
                        delta: 1
                      })
                }
            })
           
        }
    }
}

function getReq(url, token, cb) {
    wx.showLoading({
        title: '加载中',
    })

    if (token) {
        var header = {
            'content-type': 'application/json',
            'token': token,
        };
    } else {
        var header = {
            'content-type': 'application/json',

        };
    }

    wx.request({
        url: rootDocment + url,
        method: 'get',
        header: header,
        success: function (res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res.data)
        },
        fail: function () {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络出错，请刷新重试',
                showCancel: false
            })
            return typeof cb == "function" && cb(false)
        }
    })
}

function postReq(url, data, token, cb) {
    wx.showLoading({
        title: '加载中',
    })

    if (token) {
        var header = {
            'content-type': 'application/json',
            'token': token,
        };
    } else {
        var header = {
            'content-type': 'application/json',

        };
    }

    wx.request({
        url: rootDocment + url,
        header: header,
        data: data,
        method: 'post',
        success: function (res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res.data)
        },
        fail: function () {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络出错，请刷新重试',
                showCancel: false
            })
            return typeof cb == "function" && cb(false)
        }
    })

}

function check_auth() {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
        console.log('登录成功');
    } else {

        wx.login({
            success: function (res) {
                console.log(res);
                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: function (res_user) {

                            var fx = wx.getStorageSync('fx');

                            wx.request({
                                //后台接口地址
                                url: rootDocment + 'user/third',
                                data: {
                                    code: res.code,
                                    encryptedData: res_user.encryptedData,
                                    iv: res_user.iv,
                                    platform: "wechat",
                                    fx: fx
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function (res) {
                                    console.log(res);

                                    wx.removeStorageSync('fx')
                                    if (res.data.code > 0) {
                                        wx.setStorageSync('userInfo', res.data.data.userinfo.token);

                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    } else {

                                        tips.error('获取信息失败');
                                    }



                                }
                            })
                        },
                        fail: function () {
                            wx.getUserInfo({
                                success: function (res) {

                                },
                                fail: function () {
                                    // fail
                                    wx.navigateTo({
                                        //url: '/pages/cart/cart',
                                        url: '/pages/auth/auth',
                                    })
                                    console.log("未授权")
                                },
                                complete: function () {
                                    // complete
                                    console.log("获取用户信息完成！")
                                }
                            })

                        },
                        complete: function (res) {
                            console.log('授权完成');
                        }
                    })
                }
            }
        })
    }
}

function get_userInfo(cb) {
    var token = wx.getStorageSync('userInfo');
    wx.showLoading({
        title: '加载中',
    })
    if (token) {
        var header = {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token,
        };
    }
    wx.request({
        url: rootDocment + 'user/get_user_info',
        method: 'get',
        header: header,
        success: function (res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res.data)

        },
        fail: function () {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络出错，请刷新重试',
                showCancel: false
            })
            return typeof cb == "function" && cb(false)
        }
    })

}

function get_user_token() {
    var token = wx.getStorageSync('userInfo');
    if (token) {
        return token;
    }
    return false;
}

//跳转新页面页面，保留当前页面。
function navigateTo(url) {
    wx.navigateTo({
        url: url
    })
}
//跳转新页面页面，关闭当前页面。
function redirectTo(url) {
    wx.redirectTo({
        url: url
    })
}
//关闭其他所有非 tabBar 页面，跳转到 tabBar 页面
function reLaunch(url) { //url必须为tabbar页面的路径，否则没有效果
    wx.switchTab({
        url: url
    })
}
//返回页面
function navigateBack(delta) { //注意：此处的delta为number(数字)
    wx.navigateBack({
        delta: delta
    })
}

function switchTab(url) {

    wx.switchTab({
        url: url
    });
}

module.exports = {
    getReq: getReq,
    postReq: postReq,
    header: header,
    check_auth: check_auth,
    get_userInfo: get_userInfo,
    get_user_token: get_user_token,
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    reLaunch: reLaunch,
    navigateBack: navigateBack,
    switchTab: switchTab,
    checkAuth: checkAuth,
}
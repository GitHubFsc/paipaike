// pages/addCourseInfo/addCourseInfo.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        kcIndex: 0,
        jsIndex: 0,
        bjIndex: 0,
        teacherIndex: 0,
        checked: false,
        courseArray: [],
        classArray: [],
        classRoomArray: [],
        teacherArray: [],
        date: '',
        startDate: '0:00',
        endDate: '24:00',
        capacity: '',
        id: 0,
        image: '',
        imagePath: '',
        imgShow: true,
        className: '',
        classRoomName: '',
        mode: 0
    },

    showJiaoshi: function () {

        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "ease-in-out",
            delay: 0
        })
        this.animation = animation
        animation.translateY(500).step()
        this.setData({
            animationData: animation.export(),
            showModalStatusJs: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },


    hideModalJs: function () {
        this.setData({
            showModalStatusJs: false,
        })
    },


    showModal: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
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
        }.bind(this), 200)
    },
    hideModal: function () {
        this.setData({
            showModalStatus: false,
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },

    bindStartDateChange: function (e) {
        this.setData({
            startDate: e.detail.value
        })
    },
    bindEndDateChange: function (e) {
        this.setData({
            endDate: e.detail.value
        })
    },

    bindPickerChange: function (e) {
        this.setData({
            bjIndex: e.detail.value
        })
    },

    bindKCPickerChange: function (e) {
        this.setData({
            kcIndex: e.detail.value
        })
    },

    bindJSPickerChange: function (e) {
        this.setData({
            jsIndex: e.detail.value
        })
    },

    bindTeacherPickerChange: function (e) {
        this.setData({
            teacherIndex: e.detail.value
        })
    },

    submitForm: function () {
        wx.switchTab({
            url: '/pages/listenList/listenList',
        })
    },

    addTeacher() {
        wx.navigateTo({
            url: '/pages/addTeacher/addTeacher'
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            date : options.date
        })
        http.checkAuth()
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
    submitFn() {
        let data = this.data
        if (!data.capacity) {
            tips.alert('班级容量不能为空')
            return
        }
        // if (!data.image) {
        //     tips.alert('图片不能为空')
        //     return
        // }
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/CourseSchedule/AddOrUpdate', {
            orgId: orgId,
            id: data.id,
            courseId: data.courseArray[data.kcIndex].id,
            classId: data.classArray[data.bjIndex].id,
            classRoomId: data.classRoomArray[data.jsIndex].id,
            date: data.date,
            start: data.startDate,
            end: data.endDate,
            teacherId: data.teacherArray[data.teacherIndex].id,
            capacity: data.capacity,
            image: "",
            mode: data.mode
        }, null, (res) => {
            if (res.ErrCode == 0) {
                wx.showToast({
                    title: '提交成功',
                    success() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    addClassRoomFn() {
        let that = this
        let name = that.data.classRoomName
        if (!name) {
            tips.alert('请录入教室')
            return
        }
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/ClassRoom/AddOrUpdate', {
            orgId: orgId,
            name: name
        }, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    showModalStatusJs: false
                })
                wx.showToast({
                    title: '添加成功',
                    success() {
                        let classRoomList = res.Response
                        that.setData({
                            classRoomArray:classRoomList,
                            jsIndex:0
                        })
                    }
                })
            } else {
                tips.alert(res.errMsg)
            }
        })
    },
    addClassFn(e) {
        let that = this
        let orgId = wx.getStorageSync('orgId')
        let name = that.data.className
        if (!name) {
            tips.alert('请录入班级')
            return
        }
        http.postReq('/api/Class/AddOrUpdate', {
            orgId: orgId,
            name: name
        }, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    showModalStatus: false
                })
                wx.showToast({
                    title: '添加成功',
                    success() {
                        let classList = res.Response
                        that.setData({
                            classArray:classList,
                            bjIndex:0
                        })
                    }
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    loadData() {
        let that = this
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/CourseSchedule/Get?id=0&orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                let data = res.Response
                let courseList = data.courseList
                for (let i in courseList) {
                    if (courseList[i].id == data.courseId) {
                        that.data.kcIndex = i
                    }
                }
                let classList = data.classList
                for (let i in classList) {
                    if (classList[i].id == data.classId) {
                        that.data.bjIndex = i
                    }
                }
                let classRoomList = data.classRoomList
                for (let i in classRoomList) {
                    if (classRoomList[i].id == data.classRoomId) {
                        that.data.jsIndex = i
                    }
                }
                let teacherList = data.teacherList
                for (let i in teacherList) {
                    if (teacherList[i].id == data.teacherId) {
                        that.data.teacherIndex = i
                    }
                }
                that.setData({
                    courseArray: data.courseList,
                    kcIndex: that.data.kcIndex,
                    classArray: data.classList,
                    bjIndex: that.data.bjIndex,
                    classRoomArray: data.classRoomList,
                    jsIndex: that.data.jsIndex,
                    teacherArray: data.teacherList,
                    teacherIndex: that.data.teacherIndex,
                    // date: data.date,
                    // startDate: data.start,
                    endDate: data.end,
                    capacity: data.capacity,
                    image: data.image,
                    imagePath: data.imagePath,
                    imgShow: data.imgShow
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    chooseImageTap: function () {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    // 图片本地路径
    chooseWxImage: function (type) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                if (res.tempFilePaths.length > 1) {
                    tips.error('最多只能上传1张')
                    return;
                }
                that.upImgs(res.tempFilePaths, 0) //调用上传方法
            }
        })
    },
    //上传服务器
    upImgs: function (imgurl, index) {
        var that = this;
        tips.loading()
        wx.uploadFile({
            url: rootDocment + '/api/Upload/UploadFile', //
            filePath: imgurl[index],
            name: 'file',
            header: {
                'content-type': 'multipart/form-data',
            },
            formData: null,
            success(res) {
                tips.loaded()
                const data = res.data
                let jObject = JSON.parse(data);
                if (jObject.ErrCode == 0) {
                    that.setData({
                        imagePath: imgurl[index],
                        image: jObject.Response,
                        imgShow: true,
                    })
                } else {
                    tips.error(jObject.ErrMsg);
                }
            },
            fail(err) {
                tips.error(err.errMsg)
            }
        })
    },

    classNameInput(e) {
        this.setData({
            className: e.detail.value
        })
    },
    classRoomNameInput(e) {
        this.setData({
            classRoomName: e.detail.value
        })
    },
    capacityInput(e) {
        this.setData({
            capacity: e.detail.value.replace(/^d{2}$/, '')
        })
    },
    removeImageFn() {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    that.setData({
                        imagePath: '',
                        image: '',
                        imgShow: false
                    });
                } else if (sm.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
})
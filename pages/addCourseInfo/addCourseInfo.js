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
        plIndex: 0,
        kcIndex: 0,
        jsIndex: 0,
        bjIndex: 0,
        teacherIndex: 0,
        checked: false,
        intervalArray: [],
        courseArray: [],
        classArray: [],
        studentArray: [],
        classRoomArray: [],
        teacherArray: [],
        date: '2016-09-01',
        startDate: '0:00',
        endDate: '24:00',
        capacity: 1,
        id: 0,
        image: '',
        imagePath: '',
        imgShow: true,
        className: '',
        classRoomName: '',
        mode: 1,
        value: [],
        selectValue: [],
        selectStatus: false,
        classRoomName: '',
        editClassRoomId: 0
    },

    bindPxClassChange: function (e) {
        let items = this.data.pxClass;
        let selectArray = [];

        this.setData({
            pxValue: e.detail.value,
        });

        //整理所选择数据做页面显示渲染
        let valueArray = this.data.pxValue;

        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < valueArray.length; j++) {

                if (valueArray[j] == items[i].name) {

                    selectArray.push(items[i]);
                }
            }
        }

        this.setData({
            pxSelectValue: selectArray
        })

        if (this.data.pxSelectValue.length > 0) {
            this.setData({
                pxStatus: true
            })
        } else {
            this.setData({
                pxStatus: false
            })
        }
    },
    addOrUpdateClassRoomFn() {
        let that = this
        let orgId = wx.getStorageSync('orgId')
        let name = that.data.classRoomName
        http.postReq('/api/ClassRoom/AddOrUpdate', {
            id: that.data.editClassRoomId,
            orgId: orgId,
            name: name
        }, null, (res) => {
            if (res.ErrCode == 0) {
                that.loadData()
                wx.showToast({
                    title: '提交成功',
                    success() {
                        that.setData({
                            showAddModalStatus: false,
                            showEditModalStatus: false,
                            editClassRoomId: 0
                        })
                        let classRoomList = res.Response

                        that.setData({
                            classRoomArray: classRoomList,
                            jsIndex: 0
                        })
                    }
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    bindSelectorChange(e) {
        let items = this.data.items;
        let selectArray = [];
        //整理所选择数据做页面显示渲染
        let valueArray = e.detail.value;
        this.setData({
            value: valueArray
        })
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < valueArray.length; j++) {
                if (valueArray[j] == items[i].id) {
                    selectArray.push(items[i]);
                }
            }
        }
        if (this.data.capacity == 0) {
            this.setData({
                selectValue: selectArray,
                capacity: this.data.value.length
            })
        } else {
            if (this.data.capacity < this.data.value.length) {
                this.setData({
                    selectValue: selectArray,
                    capacity: this.data.value.length
                })
            } else {
                this.setData({
                    selectValue: selectArray,
                })
            }

        }

        if (this.data.selectValue.length > 0) {
            this.setData({
                selectStatus: true
            })
        } else {
            this.setData({
                selectStatus: false
            })
        }
    },
    getDate(str) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getHours();
        let timedate = hours + ":" + minutes;
        if (str) {
            this.setData({
                datestart: str,
                date: str,
                timedate: timedate
            });
        } else {
            let datestart = year + "-" + month + "-" + day;
            this.setData({
                datestart,
                date: datestart,
                timedate: timedate
            });
        }
    },
    addTeacher() {
        wx.navigateTo({
            url: '/pages/addTeacher/addTeacher'
        });
    },

    addStudent() {
        wx.navigateTo({
            url: '/pages/addStudent/addStudent'
        });
    },

    onModalOpen() {

    },
    onModalClose() {

    },

    showEditModal: function () {
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
            showAddModalStatus: false,
            showModalStatus: false,
            showEditModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },

    showAddModal: function () {
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
            showAddModalStatus: true,
            showModalStatus: false,
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },


    deleteRoomFn: function (e) {
        let that = this
        let id = e.detail.value
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/ClassRoom/Remove?id=' + id, null, (res) => {
                        wx.showToast({
                            title: '删除成功',
                            success() {
                                let classRoomList = res.Response
                                that.setData({
                                    classRoomArray: classRoomList,
                                    jsIndex: 0
                                })
                            }
                        })
                    })
                } else if (sm.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    showModal: function () {
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
            showAddModalStatus: false,
            showEditModalStatus: false,
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
        let id = this.data.courseArray[e.detail.value].id
        this.getData(id,0,res => {
            console.log(e.detail.value,0,res)
            this.setData({
                teacherArray: res.Response,
            })
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
        
        // this.getData(id,e.detail.value,res => {
        //     console.log(res)
        // })
    },

    bindPinLvPickerChange: function (e) {
        this.setData({
            plIndex: e.detail.value
        })
    },

    submitForm: function () {
        let target = /^(?:\d?\d|100)$/;
        if (!target.test(this.inputValue)) {
            wx.showToast({
                title: '班级容量为1-100的数',
                icon: 'none',
                mask: true
            });
        } else {
            wx.switchTab({
                url: '/pages/courseList/courseList',
            })
        }
    },

    // 输入框实时绑定
    bindKeyInput(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        this.setData({
            date: options.date
        });
        this.getDate(options.date)
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
    deleteClassRoomFn(e) {
        let that = this
        let id = e.currentTarget.dataset.id
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/ClassRoom/Remove?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            that.setData({
                                showModalStatus: false,
                                showEditModalStatus: false,
                            })
                            let classRoomList = res.Response
                            that.setData({
                                classRoomArray: classRoomList,
                                jsIndex: 0
                            })
                        } else {
                            tips.error(res.ErrMsg)
                        }
                    })
                }
            }
        })

    },
    editClassRoomFn(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        this.setData({
            showModalStatus: false,
            classRoomName: name,
            editClassRoomId: id,
            showEditModalStatus: true
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

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
                let intervalList = data.intervalList
                for (let i in intervalList) {
                    if (intervalList[i] == data.intervalId) {
                        that.data.plIndex = i
                    }
                }
                let arrStu = [];
                let arrStuSelected = [];
                let stuIdList = data.studentIdList
                let stuList = data.studentList
                stuList.map(arr => {
                    arrStu.push({
                        id: arr.id + '',
                        name: arr.cn_name,
                        value: arr.cn_name
                    })
                    stuIdList.map(res => {
                        if (arr.id == res) {
                            arrStuSelected.push({
                                id: arr.id + '',
                                name: arr.cn_name,
                                value: arr.cn_name
                            })
                        }
                    })
                })
                // console.log("arrStu",arrStu);

                // for (let i in stuList) {
                //     let data = {
                //         id: stuList[i].id+'',
                //         name: stuList[i].cn_name,
                //         value: stuList[i].cn_name
                //     }
                //     // arrStu.push(data)
                //     for (let j in stuIdList) {
                //         if (stuList[i].id == stuIdList[j]) {
                //             arrStuSelected.push(data)
                //         }
                //     }
                // }
                // console.log("arrStuSelected",arrStuSelected);
                let arrStuId = new Array()

                for (let i in stuIdList) {
                    arrStuId.push(stuIdList[i])
                }
                that.getData(data.courseList[that.data.kcIndex].id, 0, res => {
                    console.log(res);
                    that.setData({
                        teacherArray: res.Response,
                    })
                })
                that.setData({
                    items: arrStu,
                    selectStatus: arrStuSelected.length > 0,
                    value: arrStuId,
                    selectValue: arrStuSelected,
                    intervalArray: data.intervalList,
                    plIndex: that.data.plIndex,

                    courseArray: data.courseList,
                    kcIndex: that.data.kcIndex,


                    classArray: data.classList,
                    bjIndex: that.data.bjIndex,
                    classRoomArray: data.classRoomList,
                    jsIndex: that.data.jsIndex,

                    // teacherArray: data.teacherList,

                    // teacherIndex: that.data.teacherIndex,
                    //date: data.date,
                    startDate: data.start,
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
    classRoomNameInput(e) {
        this.setData({
            classRoomName: e.detail.value
        })
    },
    submitFn() {
        let data = this.data
        let target = /^(?:\d?\d|100)$/;
        if (!target.test(data.capacity)) {
            wx.showToast({
                title: '班级容量为1-100的数',
                icon: 'none',
                mask: true
            });
        }
        if (!data.value) {
            tips.alert('请选择学员')
            return
        }
        let time  = data.date +' '+data.startDate;
        if(new Date().getTime()> new Date(time).getTime()){
            tips.alert('您选择的时间为过去时间,请重新安排上课时间')
            return
        }
        if(data.startDate==data.endDate){
            tips.alert('请选择的不同上课开始时间和结束时间')
            return
        }
        let orgId = wx.getStorageSync('orgId')
        let url = '/api/CourseSchedule/AddByWeek'
        if (data.intervalArray[data.plIndex].id == 12) {
            url = '/api/CourseSchedule/AddOrUpdate';
        }
        let selectValue = '';
        if (data.value.length > 0) {
            selectValue = data.value.slice(0, data.capacity).join(',');
        } else {
            selectValue = data.value.join(',');
        }
        http.postReq(url, {
            orgId: orgId,
            courseId: data.courseArray[data.kcIndex].id,
            classId: data.classArray[data.bjIndex].id,
            classRoomId: data.classRoomArray[data.jsIndex].id,
            date: data.date,
            start: data.startDate,
            end: data.endDate,
            teacherId: data.teacherArray[data.teacherIndex].teacher_id,
            capacity: data.capacity,
            students: selectValue,
            mode: 1,
            intervalId: data.intervalArray[data.plIndex].id,
            remark: data.remark
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
    remarkInput(e) {
        this.setData({
            remark: e.detail.value
        })
    },
    capacityInput(e) {
        this.setData({
            capacity: e.detail.value,
        })

    },
    //通过老师获取课程 / 通过课程获取老师
    getData(kcIndex, teacherIndex, callback) {
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/Teacher/TS', {
            courseId: kcIndex,
            orgId : orgId,
            teacherId : teacherIndex
        }, null, (res) => {
            if (res.ErrCode == 0) {
                callback && callback(res)
            } else {
                wx.showToast({
                    title: res.ErrMsg,
                    icon: 'none'
                })
            }

        })
    }
})
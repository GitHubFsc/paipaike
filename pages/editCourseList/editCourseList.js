// pages/addCourseInfo/addCourseInfo.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
import QRCode from '../../utils/weapp-qrcode.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showAddModalStatus: false,
        showEditModalStatus: false,
        showModalStatus: false,
        show: true, //控制下拉列表的显示隐藏，false隐藏、true显示
        index: 0, //选择的下拉列表下标
        kcIndex: 0,
        jsIndex: 0,
        teacherIndex: 0,
        cishuIndex: 0,
        checked: false,
        array: ['班级1', '班级2', '班级3', '班级4'],
        classArray: ['少儿英语', '语文', '数学', '少儿编程'],
        classRoomArray: ['教室1', '教室2', '教室3', '教室4'],
        teacherArray: ['教师1', '教师2', '教师3', '教师4'],
        date: '2016-09-01',
        //: '8:00',
        //endDate: '22:00',
        cishuArray: ['单次', '每周'],

        value: [],
        selectValue: [],

        selectStatus: false,
        pxStatus: false,

        pxSelectValueNew: [],
        items: [],

        pxValue: ['1', '2', '3'],

        pxClass: [{
                name: '1',
                value: '班级A'
            }, {
                name: '2',
                value: '班级B'
            },
            {
                name: '3',
                value: '班级C'
            }, {
                name: '4',
                value: '班级D'
            }
        ],
        courseName: '',
        className: '',
        date: '',
        start: '',
        end: '',
        classRoomName: '',
        teacherName: '',
        studentArray: [],
        phone: '',
        remark: '',
        id: 0,
        mode: 0,
        capacity: 0,
        classId: 0,
        courseId: 0,
        classRoomId: 0,
        image: '',
        intervalName:'',
        intervalId:0,
        pingXingClassArray:[]
    },

    bindTeacherPickerChange: function (e) {
        this.setData({
            teacherIndex: e.detail.value
        })
    },

    bindPinLvPickerChange: function (e) {
        this.setData({
            cishuIndex: e.detail.value
        })
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
            pxSelectValueNew: selectArray
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
        this.setData({
            selectValue: selectArray
        })

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
    deleteClassRoomFn(e) {

    },
    onModalOpen() {

    },
    onModalClose() {
//console.log(this.data.value)
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
        // this.setData({
        //     startDate: e.detail.value
        // })
    },
    bindEndDateChange: function (e) {
        this.setData({
            endDate: e.detail.value
        })
    },

    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
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
        let data = this.data
        let stuIdList = data.value
        if (!stuIdList) {
            tips.alert('请选择学员')
            return
        }
        if (!data.remark) {
            tips.alert('备注不能为空')
            return
        }
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/CourseSchedule/AddOrUpdate', {
            id: data.id,
            orgId: orgId,
            classId: data.classId,
            courseId: data.courseId,
            classRoomId: data.classRoomId,
            date: data.date,
            start: data.start,
            end: data.end,
            teacherId: data.teacherArray[data.teacherIndex].id,
            capacity: data.capacity,
            students: data.value.join(','),
            remark: data.remark,
            image: data.image,
            mode: data.mode,
            intervalId:data.intervalId

        }, null, (res) => {
            if (res.ErrCode == 0) {
                wx.showToast({
                    title: '保存成功',
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

    deleteRoomFn: function () {
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {

                    tips.success('删除成功');

                    // http.postReq('user/del_cart', { "goods_id": id }, http.get_user_token(), function (res) {
                    //     if (res.code == 1) {
                    //         that.get_cart_list();
                    //         tips.success('删除成功');
                    //     } else {
                    //         tips.error(res.msg);
                    //     }
                    // })
                } else if (sm.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        if (this.data.value.length > 0) {
            let selectArray = [];
            this.setData({
                selectStatus: true
            })
            let items = this.data.items;
            let valueArray = this.data.value;
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < valueArray.length; j++) {
                    if (valueArray[j] == items[i].name) {
                        selectArray.push(items[i]);
                    }
                }
            }
            this.setData({
                selectValue: selectArray
            })
        }


        if (this.data.pxValue.length > 0) {
            let pxSelectArray = [];
            this.setData({
                pxStatus: true
            })

            let items = this.data.pxClass;

            let valueArray = this.data.pxValue;
            console.log(valueArray)

            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < valueArray.length; j++) {
                    if (valueArray[j] == items[i].name) {
                        pxSelectArray.push(items[i]);
                    }
                }
            }
            this.setData({
                pxSelectValueNew: pxSelectArray
            })

            console.log(this.data.pxSelectValueNew)

        }
        this.setData({
            id: options.id
        })
        new QRCode('myQrcode',{
            text: options.id,
            width: 144,
            height: 144,
            padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
            correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
            callback: (res) => {
              console.log(res.path)
              // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
            }
          })
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
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/CourseSchedule/Get?id=' + that.data.id + '&orgId=' + orgId+"&stuMode=0", null, (res) => {
            if (res.ErrCode == 0) {
                let data = res.Response
                let arrStu = new Array()
                let arrStuSelected = new Array()
                let stuIdList = data.studentIdList
                let stuList = data.studentList;
                let courseLists = [];
                // for (let i in stuList) {
                //     let data = {
                //         id: stuList[i].id + '',
                //         name: stuList[i].cn_name,
                //         value: stuList[i].cn_name
                //     }
                //     arrStu.push(data)
                //     for (let j in stuIdList) {
                //         if (stuList[i].id == stuIdList[j]) {
                //             arrStuSelected.push(data)
                //         }
                //     }
                // }
                
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
                            courseLists.push(arr.cn_name);
                        }
                    })
                })
                let arrStuId = new Array()

                for (let i in stuIdList) {
                    arrStuId.push(stuIdList[i]+"")
                }
                let teacherList = data.teacherList
                for (let i in teacherList) {
                    if (teacherList[i].id == data.teacherId) {
                        that.data.teacherIndex = i
                    }
                }
                that.setData({
                    selectStatus: arrStuSelected.length > 0,
                    value: arrStuId,
                    selectValue: arrStuSelected,
                    teacherArray: data.teacherList,
                    teacherIndex: that.data.teacherIndex,
                    courseName: data.courseName,
                    className: data.className,
                    date: data.date,
                    start: data.start,
                    end: data.end,
                    classRoomName: data.classRoomName,
                    teacherName: data.teacherName,
                    items: arrStu,
                    phone: data.phone,
                    remark: data.remark,
                    id: data.id,
                    mode: data.mode,
                    capacity: data.capacity,
                    courseId: data.courseId,
                    classId: data.classId,
                    classRoomId: data.classRoomId,
                    intervalName:data.intervalName,
                    intervalId:data.intervalId,
                    pingXingClassArray:data.pingXingClassList,
                    courseLists :courseLists
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    bindTeacherPickerChange: function (e) {
        this.setData({
            teacherIndex: e.detail.value
        })
    },
    remarkInput(e) {
        this.setData({
            remark: e.detail.value
        })
    }
})
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
        startDate: '8:00',
        endDate: '22:00',
        cishuArray: ['单次', '每周'],

        value: ['1', '2', '3'],
        selectValue: [],

        selectStatus: false,
        pxStatus: false,

        pxSelectValueNew: [],
        items: [{
            name: '1',
            value: '学员小明1'
        }, {
            name: '2',
            value: '学员小明2'
        }, {
            name: '3',
            value: '学员小明3'
        }, {
            name: '4',
            value: '学员小明4'
        }, {
            name: '5',
            value: '学员小明5'
        }],

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
        mode: 0
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

        this.setData({
            value: e.detail.value,
        });

        //整理所选择数据做页面显示渲染
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

        if (this.data.selectValue.length > 0) {
            this.setData({
                selectStatus: true
            })
        } else {
            this.setData({
                selectStatus: false
            })
        }



        console.log(this.data.selectValue);
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

    editCourseList: function () {
        wx.navigateTo({
            url: '/pages/editCourseList/editCourseList?id='+this.data.id,
        })
    },

    deleteRoomFn: function () {
        let that = this
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/CourseSchedule/Remove?id=' + that.data.id, null, (res) => {
                        if (res.ErrCode == 0) {
                            wx.showToast({
                                title: '删除成功',
                                success() {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }
                            })
                        } else {
                            tips.error(res.ErrMsg)
                        }
                    })

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
                id: options.id,
                pxSelectValueNew: pxSelectArray
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

        }
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
        http.getReq('/api/CourseSchedule/Get?id=' + that.data.id + '&orgId=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                let data = res.Response
                let arrStuSelected = new Array()
                let stuList = data.studentList
                let stuIdList=data.studentIdList
                for (let i in stuList) {
                    for (let j in stuIdList) {
                        if (stuList[i].id == stuIdList[j]) {
                            arrStuSelected.push(stuList[i])
                        }
                    }
                }
                that.setData({
                    courseName: data.courseName,
                    className: data.className,
                    date: data.date,
                    start: data.start,
                    end: data.end,
                    classRoomName: data.classRoomName,
                    teacherName: data.teacherName,
                    studentArray: arrStuSelected,
                    phone: data.phone,
                    remark: data.remark,
                    id: data.id,
                    mode: data.mode
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
})
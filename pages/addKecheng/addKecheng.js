// pages/addCourseInfo/addTeacher.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        showAddModalStatus: false,
        showEditModalStatus: false,
        showModalStatus: false,
        imagePath: '',
        editId: 0,
        editName: '',
        className: '',
        index: 0,
        checked: false,
        value: [],
        items: [],
        param: {},
        path: '',
        name: '',
        content: '',
        item: '',
        suitCrowd: '',
        id: 0,
        image: '',
        itemId: []
    },

    formSubmit: function (e) {
        let that = this
        let { name, content, item, suitCrowd } = e.detail.value;
        let classes = that.data.value;
        let id = that.data.id;
        if (!name) {
            tips.alert('名称不能为空')
            return;
        }
        var reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/g;
        if(!reg.test(name)){
            tips.alert('名称不符合规则')
            return;
        }
        if (!content) {
            tips.alert('内容不能为空')
            return;
        }
        if (!item) {
            tips.alert('特色不能为空')
            return;
        }
        if (!suitCrowd) {
            tips.alert('对象不能为空')
            return;
        }
        if (!classes) {
            tips.alert('班级不能为空')
            return;
        }
        if (!that.data.image) {
            tips.alert('图片不能为空')
            return;
        }
        let orgId = wx.getStorageSync('orgId');
        wx.request({
            url: rootDocment + '/api/Course/AddOrUpdate',
            data: {
                id: id,
                name: name,
                content: content,
                item: item,
                suitCrowd: suitCrowd,
                classes: classes.join(','),
                image: that.data.image,
                orgId: orgId
            },
            method: 'POST',
            success: (res) => {
                if (res.data.ErrCode == 0) {
                    tips.success('提交成功')
                    wx.navigateBack({
                        delta: 1
                    });
                } else {
                    tips.error(res.data.ErrMsg)
                }
            },
            fail: (res) => {
                tips.error(res.errMsg)
            }
        })
    },

    bindSelectorChange(e) {
        this.setData({
            value: e.detail.value
        })
    },

    onModalOpen() {

    },

    onModalClose() {

    },

    chooseImageTap: function () {
        var that = this;
        // if (that.data.image.length > 1) {
        //     tips.error('最多只能上传1张')
        // }
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

    deleteImageFn(e) {
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

    bindDateChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    showEditModal: function (e) {
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
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        this.setData({
            editId: id,
            editName: name
        });
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
        this.setData({
            editId: 0,
            editName: ''
        });
    },

    deleteRoomFn: function (e) {
        let that = this;
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Class/Remove?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            let arrClass = new Array();
                            let classList = res.Response;
                            for (let i = 0; i < classList.length; i++) {
                                let data = {
                                    id: classList[i].id + '',
                                    name: classList[i].name,
                                    value: classList[i].name
                                }
                                arrClass.push(data)
                            }

                            let arrClassId = new Array()
                            let classIdList = res.Response.classIdList;
                            for (let i = 0; i < classIdList.length; i++) {
                                arrClassId.push(classIdList[i])
                            }
                            that.setData({
                                items: arrClass,
                                value: arrClassId
                            })
                        } else {
                            tips.error(res.ErrMsg)
                        }
                    });
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
    saveClassFn() {
        let that = this;
        let classValue = that.data.editName;
        if (!classValue) {
            tips.error('请输入班级名称');
            return;
        }
        that.setData({
            showModalStatus: false,
        })
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/Class/AddOrUpdate', {
            id: that.data.editId,
            orgId: orgId,
            name: that.data.editName
        }, null, (res) => {
            if (res.ErrCode == 0) {
                let arrClass = new Array();
                let classList = res.Response;
                for (let i = 0; i < classList.length; i++) {
                    let data = {
                        id: classList[i].id + '',
                        name: classList[i].name,
                        value: classList[i].name
                    }
                    arrClass.push(data)
                }

                let arrClassId = new Array()
                let classIdList = res.Response;
                for (let i = 0; i < classIdList.length; i++) {
                    arrClassId.push(classIdList[i])
                }
                that.setData({
                    items: arrClass,
                    value: arrClassId
                })
                that.loadData();
            } else {
                tips.error(res.ErrMsg)
            }
        })
        that.hideModal()
    },
    nameInput:function(e) {
        // let name = e.detail.value
        // return name.replace(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/g, '')
        this.setData({
            name: e.detail.value
        });
    },
    editNameInput(e) {
        this.setData({
            editName: e.detail.value
        });
    },
    //绑定班级输入
    classInput: function (e) {
        this.setData({
            className: e.detail.value
        })
    },


    //添加班级
    // saveClassFn: function () {
    //     var that = this;
    //     let classValue = that.data.editName;
    //     if (!classValue) {
    //         tips.error('请输入班级名称');
    //         return;
    //     }
    //     that.setData({
    //         showModalStatus: false,
    //     })
    //     http.getReq('/api/Class/AddOrUpdate')
    // },
    //加载数据
    loadData() {
        let that = this;
        if (this.data.id === undefined) {
            that.setData({
                id: 0
            })
        }
        let selector = that.selectComponent('#selector')
        let orgId = wx.getStorageSync('orgId');
        http.getReq('/api/Course/Get?orgId=' + orgId + '&id=' + that.data.id, null, function (res) {
            if (res.ErrCode == 0) {
                let arrClass = new Array();
                let classList = res.Response.classList;
                for (let i = 0; i < classList.length; i++) {
                    let data = {
                        id: classList[i].id + '',
                        name: classList[i].name,
                        value: classList[i].name
                    }
                    arrClass.push(data)
                }

                let arrClassId = new Array()
                let classIdList = res.Response.classIdList;
                for (let i = 0; i < classIdList.length; i++) {
                    arrClassId.push(classIdList[i])
                }
                console.log(arrClassId);
                that.setData({
                    imgShow: res.Response.imgShow,
                    image: res.Response.image,
                    imagePath: res.Response.imagePath,
                    items: arrClass,
                    value: arrClassId,
                    id: res.Response.id,
                    name: res.Response.name,
                    content: res.Response.content,
                    item: res.Response.item,
                    suitCrowd: res.Response.suitCrowd
                });
                // selector.init();
            } else {
                tips.error(res.ErrMsg)
            }
        });

    },

    submitAdd: function () {
        wx.navigateTo({
            url: '/pages/addCourseList/addCourseList',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        this.setData({
            id: options.id
        })
        this.loadData();
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

    }
})
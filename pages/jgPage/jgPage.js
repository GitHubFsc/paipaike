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
        dataList: {
            mc: "机构名称",
            xq: "地址",
            nr: "电话",
            ts: "文字介绍",
            sh: "图片介绍",
        },

        index: 0,
        checked: false,
        value: ['1', '2', '3'],
        items: [{
            name: '1',
            value: '班级1'
        }, {
            name: '2',
            value: '班级2'
        }, {
            name: '3',
            value: '班级3'
        }, {
            name: '4',
            value: '班级4'
        }, {
            name: '5',
            value: '班级5'
        }],
        name: '',
        address: '',
        phone: '',
        info: '',
        image: '',
        id: 0,
        imagePath: '',
        imgShow: false,
        image: ''

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

    bindDateChange: function (e) {
        this.setData({
            index: e.detail.value
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
    submitEdit: function () {
        let data = this.data
        if (!data.name) {
            tips.alert('名称不能为空')
            return
        }
        if (!data.address) {
            tips.alert('地址不能为空')
            return
        }
        if (!data.phone) {
            tips.alert('电话不能为空')
            return
        }
        if (!data.image) {
            tips.alert('图片不能为空')
            return
        }
        let id = wx.getStorageSync('orgId')
        http.postReq('/api/Organ/AddOrUpdate', {
            id: id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            info: data.info,
            image: data.image
        }, null, (res) => {
            if (res.ErrCode == 0) {
                tips.success('提交成功')
                wx.navigateBack({
                    delta: 1
                });
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
    loadData() {
        let that = this
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Organ/Get?id=' + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                that.setData({
                    name: res.Response.name,
                    id: orgId,
                    address: res.Response.address,
                    phone: res.Response.phone,
                    info: res.Response.info,
                    image: res.Response.image,
                    imagePath:res.Response.imagePath,
                    imgShow:res.Response.imgShow
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    nameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    addressInput(e) {
        this.setData({
            address: e.detail.value
        })
    },
    phoneInput(e) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(e.detail.value)) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'none',
                duration: 1500
            })
            this.setData({
                phone: null
            })
        } else {
            this.setData({
                phone: e.detail.value
            })
        }
    },
    infoInput(e) {
        this.setData({
            info: e.detail.value
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
})
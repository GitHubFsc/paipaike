// pages/enrollActivity/enrollActivity.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        maxLength: 5000,
        id: 0,
        title: '',
        content: '',
        imgShow: false,
        image: [],
        imagePath: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        this.setData({
            id: options.id
        })
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
        http.getReq('/api/Notice/Get?id=' + that.data.id, null, (res) => {
            if (res.ErrCode == 0) {
                if(res.Response.imagePath.length>0){
                    that.data.imgShow=true
                }
                that.setData({
                    id: res.Response.id,
                    title: res.Response.title,
                    content: res.Response.content,
                    imgShow:that.data.imgShow,
                    imagePath: res.Response.imagePath,
                    image:res.Response.image
                })
            } else {
                tips.error(res.ErrMsg)
            }
        })
    },
    submitFn() {
        let data = this.data
        if (!data.title) {
            tips.alert('标题不能为空')
            return
        }
        if (!data.content) {
            tips.alert('内容不能为空')
            return
        }
        if(data.image.length<=0){
            tips.alert('图片不能为空')
            return
        }
        let orgId = wx.getStorageSync('orgId')
        let image=data.image.join(',')
        http.postReq('/api/Notice/AddOrUpdate', {
            id: data.id,
            title: data.title,
            content: data.content,
            orgId: orgId,
            image:image
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
    titleInput(e) {
        this.setData({
            title: e.detail.value
        })
    },
    contentInput(e) {
        this.setData({
            content: e.detail.value
        })
    },
    chooseMultImageTap: function () {
        let that = this
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseMultWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseMultWxImage('camera')
                    }
                }
            }
        })
    },
    // 图片本地路径
    chooseMultWxImage: function (type) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                that.upMultImgs(res.tempFilePaths, 0) //调用上传方法
            }
        })
    },
    //上传服务器
    upMultImgs: function (imgurl, index) {
        var that = this;
        for (let i in imgurl) {
            wx.uploadFile({
                url: rootDocment + '/api/Upload/UploadFile', //
                filePath: imgurl[i],
                name: 'file',
                header: {
                    'content-type': 'multipart/form-data',
                },
                formData: null,
                success(res) {
                    console.log(res)
                    const data = res.data
                    let jObject = JSON.parse(data);
                    if (jObject.ErrCode == 0) {
                        that.data.imagePath.push(imgurl[i])
                        that.data.image.push(jObject.Response)
                        that.data.imgShow = true
                        that.setData({
                            imagePath: that.data.imagePath,
                            image: that.data.image,
                            imgShow: true
                        })
                    } else {
                        tips.error(jObject.ErrMsg);
                    }
                },
                fail(err) {
                    tips.error(err.errMsg)
                }
            })
        }
    },
    deleteMultImageFn(e) {
        let that = this;
        let index = e.currentTarget.dataset.index
        console.log(index)
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    that.data.imagePath.splice(index, 1);
                    that.data.image.splice(index, 1);
                    if (that.data.imagePath.length <= 0) {
                        that.data.imgShow = false
                    }
                    that.setData({
                        imagePath: that.data.imagePath,
                        image: that.data.image,
                        imgShow: that.data.imgShow
                    })
                } else if (sm.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
})
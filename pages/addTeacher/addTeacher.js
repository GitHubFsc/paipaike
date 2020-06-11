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
        show: true, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectData: [], //下拉列表的数据
        courseData: [], //下拉列表的数据
        index: 0, //选择的下拉列表下标
        checked: false,
        index: 0,
        kcIndex: 0,
        date: '',
        id: 0,
        cn_name: '',
        en_name: '',
        info: '',
        phone: '',
        course_id: 0,
        org_id: 0,
        certificate: [],
        certificatePath: [],
        value: [],
        selectValue: [],
        certShow: false,
        imgShow: false,
        imagePath: '',
        image: '',
        type: 1,
        ext: false,
        offical: false
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })

    },


    // 点击下拉显示框
    selectTap() {
        this.setData({
            show: !this.data.show
        });
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

    submitAllocation: function () {
        let that = this
        let data = that.data
        if (!data.cn_name) {
            tips.alert('中文姓名不能为空')
            return
        }

        if (!data.en_name) {
            tips.alert('英文姓名不能为空')
            return
        }
        if (data.value.length<1) {
            tips.alert('请选择教授科目')
            return
        }
        var reg = /^[\u4e00-\u9fa5]/;
        if (!reg.test(data.cn_name)) {
            tips.alert('中文姓名不符合规则')
            return;
        }
        reg = /^[a-zA-Z]/;
        if (!reg.test(data.en_name)) {
            tips.alert('英文姓名不符合规则')
            return;
        }
        if (data.type == -1) {
            tips.alert('请选择教师类型');
            return
        }
        if (!data.info) {
            tips.alert('介绍不能为空')
            return
        }
        if (!data.phone) {
            tips.alert('手机不能为空')
            return
        }
        if (!data.image) {
            tips.alert('图片不能为空')
            return
        }
        if (!data.date) {
            tips.alert('时间不能为空')
            return
        }
        let selectValue = [];
        if (data.value.length > 0) {
            selectValue = data.value.map(arr => {
                return Number(arr);
            });
        } else {
            selectValue = [...data.value];
        }

        let orgId = wx.getStorageSync('orgId') 
        let certificate  = '';
        if(data.certificate.length>0){
            certificate = data.certificate.join(',')
        }
        http.postReq('/api/Teacher/AddOrUpdate', {
            id: data.id,
            cnName: data.cn_name,
            enName: data.en_name,
            info: data.info,
            entryTime: data.date,
            phone: data.phone,
            courseList: selectValue,
            orgId: orgId,
            image: data.image,
            type: Number(data.type),
            certificate: certificate,
            courseId: 0
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

    // 点击下拉列表
    optionTap(e) {
        let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
        this.setData({
            index: Index,
            show: !this.data.show
        });
    },
    cnNameInput(e) {
        this.setData({
            cn_name: e.detail.value.replace(/[^\u4E00-\u9FA5]/g, '')
        })
    },
    enNameInput(e) {
        this.setData({
            en_name: e.detail.value.replace(/[^a-zA-Z]/g, '')
        })
    },
    infoInput(e) {
        this.setData({
            info: e.detail.value
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



    loadData() {
        let that = this;
        if (this.data.id === undefined) {
            that.setData({
                id: 0
            })
        }
        let id = that.data.id;
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Teacher/Get?id=' + id + "&orgId=" + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                let data = res.Response;
                let courseData = [],
                    value = [],
                    selectValue = [],
                    courseLists = [];
                if(id==0){
                    data.courseList.map(arr=>{
                        courseData.push({
                            id : arr.id + '',
                            name:arr.name,
                            value:arr.name,
                            checked:false,
                        })
                    })
                }else{
                    let arr1 = data.courseList,
                    arr2 = data.courseLists;
                    for (let i = 0; i < arr1.length; i++) {
                        let ids, val, name, checked = false;
                        for (let j = 0; j < arr2.length; j++) {
                            if (arr1[i].id == arr2[j]) {
                                ids = arr1[i].id + '';
                                name = arr1[i].name;
                                val = arr1[i].name;
                                checked = true;
                                courseLists.push(arr1[i].name);
                            } else {
                                ids = arr1[i].id + '';
                                name = arr1[i].name;
                                val = arr1[i].name;
                            }
                        }
                        courseData.push({
                            id: ids,
                            name: name,
                            value: val,
                            checked: checked,
                        })
                    }
                }
                

                value = [...data.courseLists];
                for (let i in data.courseData) {
                    if (data.orgId == data.orgList[i].id) {
                        that.data.index = i;
                        break
                    }
                }
                that.setData({
                    ext: that.data.type == 2,
                    offical: data.type == 1,
                    courseData,
                    kcIndex: id == 0 ? '' : that.data.kcIndex,
                    index: id == 0 ? '' : that.data.index,
                    cn_name: id == 0 ? '' : data.cnName,
                    en_name: id == 0 ? '' : data.enName,
                    info: id == 0 ? '' : data.info,
                    phone: id == 0 ? '' : data.phone,
                    date: id == 0 ? '' : data.entryTime,
                    selectData: id == 0 ? '' : data.orgList,
                    imgShow: id == 0 ? '' : data.imgShow,
                    image: id == 0 ? '' : data.image,
                    imagePath: id == 0 ? '' : data.imagePath,
                    certificate: id == 0 ? '' : data.certificate,
                    certificatePath: id == 0 ? '' : data.certificatePath,
                    certShow: id == 0 ? '' : data.certShow,
                    value: id == 0 ? '' : value,
                    selectValue: id == 0 ? '' : selectValue,
                    courseLists: id == 0 ? '' : courseLists,
                })
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
        this.setData({
            id: options.id,
        });
        this.loadData()
        this.getDate()
    },
    getDate() {
        var date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let end = year + "-" + month + "-" + day;
        this.setData({
            end
        });
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
                        let data = {
                            path: imgurl[i]
                        };
                        let certificatePath = [],
                            certificate = [];
                        certificatePath.push(data);
                        certificate.push(jObject.Response);
                        that.setData({
                            certificatePath: certificatePath,
                            certificate: certificate,
                            certShow: true
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
    deleteMultImageFn(e) {
        let that = this;
        let index = e.currentTarget.dataset.index
        console.log(index)
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    that.data.certificatePath.splice(index, 1);
                    that.data.certificate.splice(index, 1);
                    if (that.data.certificatePath.length <= 0) {
                        that.data.certShow = false
                    }
                    that.setData({
                        certificatePath: that.data.certificatePath,
                        certificate: that.data.certificate,
                        certShow: that.data.certShow
                    })
                } else if (sm.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    typeChange(e) {
        this.setData({
            type: e.detail.value
        })
    },
    bindSelectorChange(e) {
        console.log(e)
        // return false
        let items = this.data.courseData;
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
})
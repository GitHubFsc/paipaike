// pages/baoMingTemp/baoMingTemp.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;

function getToday() {
    let date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: getToday(),
        start_date: getToday(),
        end_date: getToday(),
        is_show_group: false,
        is_name_secret: false,
        is_split_commission: false,
        title: '',
        group_course_name: '项目一',
        group_course_image: '',
        group_course_path: './../../images/4.png',
        group_course_content: '',
        group_course_capacity: '',
        group_course_price: '',
        group_course_prepayment: '',
        group_full_people_1: 0,
        group_full_price_1: 0,
        group_full_people_2:0 ,
        group_full_price_2: 0,
        group_full_people_3: 0,
        group_full_price_3: 0,
        is_group_master_boon: false,
        group_master_boon: '',
        mini_title_1: '',
        mini_content_1: '',
        mini_image_1: '',
        mini_path_1: '',
        mini_path_2: '',
        mini_path_3: '',
        mini_title_2: '',
        mini_content_2: '',
        mini_image_2: '',
        mini_title_3: '',
        mini_content_3: '',
        mini_image_3: '',
        shop_hot_line: '',
        shop_name: '',
        shop_address: '',
        shop_phone: '',
        user_info: '报名信息',
        user_name: '',
        user_phone: '',
        user_school: '',
        user_class: '',
        banner_image: '',
        banner_path: '',
        boon_image: '',
        boon_path: '',
        spec_image: '',
        spec_path:'',
        spec_content: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
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
        if (!data.title) {
            wx.showToast({
                title: '请输入活动标题',
                icon: 'none',
            })
            return false
        }
        if (!data.start_date) {
            wx.showToast({
                title: '请选择开始时间',
                icon: 'none',
            })
            return false
        }
        if (!data.end_date) {
            wx.showToast({
                title: '请选择结束时间',
                icon: 'none',
            })
            return false
            
        }
        if (!data.is_show_group) {
            wx.showToast({
                title: '请选择活动页面是否显示可以直接参与的活动',
                icon: 'none',
            })
            return false
        }
        if (!data.is_name_secret) {
            wx.showToast({
                title: '请选择是否对报名者姓名进行加密处理',
                icon: 'none',
            })
            return false
        }
        if (!data.group_course_content) {
            wx.showToast({
                title: '请输入活动内容',
                icon: 'none',
            })
            return false
        }
        if (!data.group_course_capacity) {
            wx.showToast({
                title: '请输入库存',
                icon: 'none',
            })
            return false
        }
        if (!data.group_course_price) {
            wx.showToast({
                title: '请输入商品原价',
                icon: 'none',
            })
            return false
        }
        if (!data.group_course_prepayment) {
            wx.showToast({
                title: '请输入活动需预付',
                icon: 'none',
            })
            return false
        }
        
        if (!data.mini_content_1) {
            wx.showToast({
                title: '请输入活动说明',
                icon: 'none',
            })
            return false
        }

        if (!data.mini_image_1) {
            wx.showToast({
                title: '请上传活动说明图片',
                icon: 'none',
            })
            return false
        }
        if (!data.spec_content_1) {
            wx.showToast({
                title: '请输入特别奖励',
                icon: 'none',
            })
            return false
        }

        if (!data.spec_image) {
            wx.showToast({
                title: '请上传特别奖励图片',
                icon: 'none',
            })
            return false
        }


        if (!data.mini_content_2) {
            wx.showToast({
                title: '请输入活动规则',
                icon: 'none',
            })
            return false
        }

        if (!data.mini_image_2) {
            wx.showToast({
                title: '请上传活动规则图片',
                icon: 'none',
            })
            return false
        }


        if (!data.mini_content_3) {
            wx.showToast({
                title: '请输入机构介绍',
                icon: 'none',
            })
            return false
        }
        if (!data.mini_image_3) {
            wx.showToast({
                title: '请上传机构介绍图片',
                icon: 'none',
            })
            return false
        }


        if (!data.shop_hot_line) {
            wx.showToast({
                title: '请输入咨询热线',
                icon: 'none',
            })
            return false
        }
        if (!data.shop_name) {
            wx.showToast({
                title: '请输入学校名称',
                icon: 'none',
            })
            return false
        }
        if (!data.shop_address) {
            wx.showToast({
                title: '请输入学校地址',
                icon: 'none',
            })
            return false
        }
        if (!data.shop_phone) {
            wx.showToast({
                title: '请输入联系电话',
                icon: 'none',
            })
            return false
        }
        
        if (!data.shop_image) {
            wx.showToast({
                title: '请上传学校信息图片',
                icon: 'none',
            })
            return false
        }

        if (!data.user_name) {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none',
            })
            return false
        }
        if (!data.user_phone) {
            wx.showToast({
                title: '请输入电话',
                icon: 'none',
            })
            return false
        }
        if (!data.user_school) {
            wx.showToast({
                title: '请输入所在学校',
                icon: 'none',
            })
            return false
        }
        if (!data.user_class) {
            wx.showToast({
                title: '请输入年级',
                icon: 'none',
            })
            return false
        }



        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/Activity/AddOrUpdate', {
            orgId:orgId,
            startDate: data.start_date,
            endDate: data.end_date,
            isShowGroup: data.is_show_group,
            isNameSecret: data.is_name_secret,
            isSplitCommission: data.is_split_commission,
            title: data.title,
            groupCourseName: data.group_course_name,
            groupCourseImage: data.group_course_image,
            groupCourseContent: data.group_course_content,
            groupCourseCapacity: data.group_course_capacity,
            groupCoursePrice: data.group_course_price,
            groupCoursePrepayment: data.group_course_prepayment,
            groupFullPeople1: data.group_full_people_1,
            groupFullPrice1: data.group_full_price_1,
            groupFullPeople2: data.group_full_people_2,
            groupFullPrice2: data.group_full_price_2,
            groupFullPeople3: data.group_full_people_3,
            groupFullPrice3: data.group_full_price_3,
            isGroupMasterBoon: data.is_group_master_boon,
            groupMasterBoon: data.group_master_boon,
            miniTitle1: data.mini_title_1,
            miniContent1: data.mini_content_1,
            miniImage1: data.mini_image_1,
            miniTitle2: data.mini_title_2,
            miniContent2: data.mini_content_2,
            miniImage2: data.mini_image_2,
            miniTitle3: data.mini_title_3,
            miniContent3: data.mini_content_3,
            miniImage3: data.mini_image_3,
            shopHotLine: data.shop_hot_line,
            shopName: data.shop_name,
            shopAddress:data.shop_address,
            shopPhone:data.shop_phone,
            userInfo: data.user_info,
            userName: data.user_name,
            userPhone: data.user_phone,
            userSchool: data.user_school,
            userClass: data.user_class,
            bannerImage: data.banner_image,

            boonImage: data.boon_image,

            activeImage: data.active_image,
            explainImage: data.explain_image,
            ruleImage: data.rule_image,
            introductionImage: data.introduction_image,

            shopImage: data.shop_image,
            specContent: data.spec_content_1,
            specImage: data.spec_image,
            type:1
        }, null, (res) => {
            if (res.ErrCode == 0) {
                wx.showToast({
                    title: '"提交成功"',
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
    // 输入监听
    inputWatch (e) {
        console.log(e);
        let item = e.currentTarget.dataset.model;
        this.setData({
            [item]: e.detail.value
        });
    },
    chooseImageTap: function (e) {
        let item = e.currentTarget.dataset.model
        let path = e.currentTarget.dataset.path
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album', item, path)
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera', item, path)
                    }
                }
            }
        })
    },
    // 图片本地路径
    chooseWxImage: function (type, item, path) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                if (res.tempFilePaths.length > 1) {
                    tips.error('最多只能上传1张')
                    return;
                }
                that.upImgs(res.tempFilePaths, item, path) //调用上传方法
            }
        })
    },
    //上传服务器
    upImgs: function (imgurl, item, path) {
        var that = this;
        tips.loading()
        wx.uploadFile({
            url: rootDocment + '/api/Upload/UploadFile', //
            filePath: imgurl[0],
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
                    console.log(jObject.Response)
                    that.setData({
                        [path]: imgurl[0],
                        [item]: jObject.Response
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
    bindStartDateChange(e) {
        console.log(e.detail.value)
        this.setData({
            start_date: e.detail.value
        })
    },
    bindEndDateChange(e) {
        console.log(e.detail.value)
        this.setData({
            end_date: e.detail.value
        })
    },
    is_show_groupChange(e) {
        this.setData({
            is_show_group: e.detail.value
        })
    },
    is_name_secretChange(e) {
        this.setData({
            is_name_secret: e.detail.value
        })
    },
    is_split_commissionChange(e) {
        this.setData({
            is_split_commission: e.detail.value
        })
    },
    is_group_master_boonChange(e) {
        this.setData({
            is_group_master_boon: e.detail.value
        })
    }
})
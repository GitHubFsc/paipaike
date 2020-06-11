const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        parentData: [],
        date: '2019-11-18',
        classData: ['幼儿园小班', '中班', '大班', '一年级', '二年级', '十二年级'],
        csIndex: 0,
        flag: 0,
        cn_name: '',
        en_name: '',
        sex: '',
        classData: [],
        school: '',
        male: false,
        female: false,
        remark: '',
        id:0,
        grade : ''
    },

    bindPhoneNumber: function () {
        wx.navigateTo({
            url: '/pages/bindPhone/bindPhone?id=0&studentId='+this.data.id,
        })
    },

    ruxueBtn: function () {
        wx.navigateTo({
            url: '/pages/studentManage/studentManage',
        })
    },

    saveStudent: function () {
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
        var reg=/^[\u4e00-\u9fa5]/;
        if(!reg.test(data.cn_name)){
            tips.alert('中文姓名不符合规则')
            return;
        }
        reg=/^[a-zA-Z]/;
        if(!reg.test(data.en_name)){
            tips.alert('英文姓名不符合规则')
            return;
        }
        if (!data.sex) {
            tips.alert('请选择性别')
            return
        }
        if (!data.grade) {
            tips.alert('年级不能为空')
            return
        }
        if (!data.school) {
            tips.alert('所在学校不能为空')
            return
        }
        let id = data.id
        http.postReq('/api/Student/Update', {
            id: id,
            cnName: data.cn_name,
            enName: data.en_name,
            sex: data.sex,
            birth: data.date,
            classId: data.classData[data.csIndex].id,
            school:data.school,
            grade : data.grade
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

    bindClassChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        let that = this
        that.setData({
            flag: options.flag,
            id: options.id,
            gradeList : app.globalData.gradeList
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
        let id = that.data.id
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Student/Get?id=' + id + "&orgId=" + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                let data = res.Response
                for (let i in data.classList) {
                    if (data.classId == data.classList[i]) {
                        that.data.csIndex = i
                        break
                    }
                }
                that.setData({
                    csIndex: that.data.csIndex,
                    cn_name: data.cnName,
                    en_name: data.enName,
                    sex: data.sex,
                    date: data.birth,
                    classData: data.classList,
                    school: data.school,
                    parentData: data.parentList,
                    parentalIdentity: data.parentalIdentity,
                    phone: data.phone,
                    male:data.male,
                    female:data.female,
                    grade : data.grade
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
    sexChange(e) {
        this.setData({
            sex: e.detail.value
        })
    },
    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    cnNameInput(e) {
        this.setData({
            cn_name: e.detail.value
        })
    },
    enNameInput(e) {
        this.setData({
            en_name: e.detail.value
        })
    },
    schoolInput(e) {
        this.setData({
            school: e.detail.value
        })
    },
    editParentFn(e){
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/bindPhone/bindPhone?id='+id+'&studentId='+this.data.id,
        })
    },
    deleteParentFn(e){
        let that=this
        let id = e.currentTarget.dataset.id
        console.log(id)
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Parent/Remove?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            tips.success('删除成功')
                            that.loadData()
                        }
                    });
                }
            }
        })
    },
    deleteStudent(e){
        let that=this
        let id=that.data.id
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Student/Remove?id=' + id+'&mode='+that.data.flag, null, (res) => {
                        if (res.ErrCode == 0) {
                            tips.success('删除成功')
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            }
        })
    },
    intoStudent(e){
        let that=this
        let id=that.data.id
        wx.showModal({
            title: '提示',
            content: '确定要入学吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Student/Into?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            tips.success('入学成功')
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            }
        })
    },
    agentInto(e){
        let that=this
        let id=that.data.id
        wx.showModal({
            title: '提示',
            content: '确定要再次就读吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Student/Into?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            tips.success('再次就读成功')
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            }
        })
    }
})
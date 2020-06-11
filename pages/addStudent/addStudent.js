// pages/addCourseInfo/addStudent.js
const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '',
        classData: [],
        csIndex: 0,
        ceIndex: 0,
        flag: 0, //用于区分学员类型的参数
        courseData: [],
        cn_name: '',
        en_name: '',
        male: false,
        female: false,
        school: '',
        parental_identity: '',
        phone: '',
        class_hour: '',
        id: 0,
        remark: '',
        sex: 0,
        courseList: [],
        grade : ''
    },

    confirmAdd: function () {
        let that = this
        let data = that.data
        if (!data.cn_name) {
            tips.alert('中文姓名不能为空')
            return
        }
        var reg = /^[\u4e00-\u9fa5]/;
        if (!reg.test(data.cn_name)) {
            tips.alert('中文姓名不符合规则')
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
            tips.alert('学校不能为空')
            return
        }
        if (!data.parental_identity) {
            tips.alert('家长身份不能为空')
            return
        }
        if (!data.phone) {
            tips.alert('电话不能为空')
            return
        }
        if (data.phone.length != 11) {
            tips.alert('电话格式不正确')
            return
        }
        if (!data.courseList ) {
            tips.alert('报名课时不能为空')
            return
        }
        let orgId = wx.getStorageSync('orgId')
        http.postReq('/api/Student/AddOrUpdate', {
            id: data.id,
            orgId: orgId,
            cnName: data.cn_name,
            enName: data.en_name,
            sex: data.sex,
            birth: data.date,
            classId: data.classData[data.csIndex].id,
            school: data.school,
            parentalIdentity: data.parental_identity,
            phone: data.phone,
            courseId: 0,
            classHour: 0,
            mode: data.flag,
            courseList : data.courseList,
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
            csIndex: e.detail.value
        })
    }, 
    bindGradeChange(e){ 
        this.setData({
            grade: this.data.gradeList[e.detail.value]
        })
    },
    bindCourseChange: function (e) {
        this.setData({
            ceIndex: e.detail.value
        })
    },
    loadData() {
        let that = this
        let id = that.id
        if (id == '') {
            id = 0
        }
        that.setData({
            id: id
        })
        let orgId = wx.getStorageSync('orgId')
        http.getReq('/api/Student/Get?id=' + id + "&orgId=" + orgId, null, (res) => {
            if (res.ErrCode == 0) {
                let data = res.Response;
                for (let i in data.courseList) {
                    if (data.courseId == data.courseList[i].id) {
                        that.data.ceIndex = i
                        break
                    }
                }
                for (let i in data.classList) {
                    if (data.classId == data.classList[i]) {
                        that.data.csIndex = i
                        break
                    }
                }
                let courseData = [];
                data.courseList.map(arr => {
                    courseData.push({
                        id: arr.id + '',
                        name: arr.name,
                        value: arr.name,
                    })
                })
                that.setData({
                    classData: data.classList,
                    courseData: courseData,
                    csIndex: id == 0 ? '' : that.data.csIndex,
                    ceIndex: id == 0 ? '' : that.data.ceIndex,
                    cn_name: id == 0 ? '' : data.cnName,
                    en_name: id == 0 ? '' : data.enName,
                    male: id == 0 ? '' : data.male,
                    female: id == 0 ? '' : data.female,
                    date: id == 0 ? '' : data.birth,
                    school: id == 0 ? '' : data.school,
                    parental_identity: id == 0 ? '' : data.parentalIdentity,
                    phone: id == 0 ? '' : data.phone,
                    class_hour: id == 0 ? '' : data.classHour,
                    remark: id == 0 ? '' : data.remark,
                    sex: id == 0 ? '' : data.sex,
                    grade : id == 0 ? '' : data.grade,
                })
            } else {
                tips.error(res.ErrMsg)
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.checkAuth()
        let that = this;
        that.setData({
            id: options.id,
            flag: options.flag,
            gradeList : app.globalData.gradeList
        })
        this.loadData()
        this.getDate()
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
    getDate() {
        var date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let end = year + "-" + month + "-" + day;
        this.setData({
            end,
            date: end
        });
    },
    cnNameInput(e) {
        console.log(e.detail.value.length)
        this.setData({
            cn_name: e.detail.value.replace(/[^\u4E00-\u9FA5]/g, '')
        })
    },
    enNameInput(e) {
        this.setData({
            en_name: e.detail.value.replace(/[^a-zA-Z]/g, '')
        })
    },
    schoolInput(e) {
        this.setData({
            school: e.detail.value
        })
    },
    parentalIdentityInput(e) {
        this.setData({
            parental_identity: e.detail.value
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
    classHourInput(e) {
        let courseList = this.data.courseList;
        let id = Number(e.currentTarget.dataset.id),
            value = Number(e.detail.value);
        if (courseList.length > 0) {
            courseList.map(arr => {
                if (arr.course_id == id) {
                    arr.class_hour = value
                } else {
                    courseList.push({
                        course_id: id,
                        class_hour: value
                    })
                }
            })
        } else {
            courseList.push({
                course_id: id,
                class_hour: value
            })
        }
        for(var i=0; i<courseList.length; i++){
            for(var j=i+1; j<courseList.length; j++){
                if(courseList[i].course_id==courseList[j].course_id){         //第一个等同于第二个，splice方法删除第二个
                    courseList.splice(j,1);
                    j--;
                }
            }
        }
        // console.log(courseList)
        console.log(e);
        this.setData({
            courseList: courseList
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
    bindSelectorChange(e) {
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
        console.log(selectArray)
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
        console.log(this.data.selectValue)
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
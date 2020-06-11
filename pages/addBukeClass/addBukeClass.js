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
    capacity: 0,
    scheduleStudentId: 0,
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
    editClassRoomId: 0,
    leaveDate: ''
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
    console.log(e.detail.value)
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

  bindPinLvPickerChange: function (e) {
    this.setData({
      plIndex: e.detail.value
    })
  },

  submitForm: function () {
    wx.switchTab({
      url: '/pages/courseList/courseList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.checkAuth()
    this.setData({
      scheduleStudentId: options.scheduleStudentId,
      leaveDate: options.leaveDate
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
              that.setData({
                classRoomArray: res.Response,
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
        wx.showToast({
          title: '提交成功',
          success() {
            that.setData({
              showAddModalStatus: false,
              showEditModalStatus: false,
              editClassRoomId: 0
            })
            that.setData({
              classRoomArray: res.Response,
              jsIndex: 0
            })
          }
        })
      } else {
        tips.error(res.ErrMsg)
      }
    })
  },
  loadData() {
    let that = this
    let orgId = wx.getStorageSync('orgId')
    http.getReq('/api/CourseSchedule/Get?id=0&orgId=' + orgId + '&scheduleStudentId=' + that.data.scheduleStudentId + "&mode=2", null, (res) => {
      if (res.ErrCode == 0) {
        let data = res.Response
        let arrStu = new Array()
        let arrStuSelected = new Array()
        let stuIdList = data.studentIdList
        let stuList = data.studentList
        // for (let i in stuList) {
        //   let data = {
        //     id: stuList[i].id + '',
        //     name: stuList[i].cn_name,
        //     value: stuList[i].cn_name
        //   }
        //   arrStu.push(data)
        //   for (let j in stuIdList) {
        //     if (stuList[i].id == stuIdList[j]) {
        //       arrStuSelected.push(data)
        //     }
        //   }
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
          leaveDate: data.leaveDate,
          selectStatus: arrStuSelected.length > 0,
          value: arrStuId,
          selectValue: arrStuSelected,
          teacherArray: data.teacherList,
          teacherIndex: that.data.teacherIndex,
          courseName: data.courseName,
          className: data.className,
          date: data.date,
          startDate: data.start,
          endDate: data.end,
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
          intervalName: data.intervalName,
          intervalId: data.intervalId,
          intervalArray: data.intervalList,
          plIndex: that.data.plIndex,
          classRoomArray: data.classRoomList,
          jsIndex: that.data.jsIndex,
        })
      } else {
        tips.error(res.ErrMsg)
      }
    })
  },
  submitFn() {
    let data = this.data
    if (!data.value) {
      tips.alert('请选择学员')
      return
    }
    let orgId = wx.getStorageSync('orgId')
    let url='/api/CourseSchedule/AddOrUpdate';
    // if(data.intervalArray[data.plIndex].id==12){
    //     url='/api/CourseSchedule/AddOrUpdate';
    // }
    http.postReq(url, {
      orgId: orgId,
      courseId: data.courseId,
      classId: data.classId,
      classRoomId: data.classRoomArray[data.jsIndex].id,
      date: data.date,
      start: data.startDate,
      end: data.endDate,
      teacherId: data.teacherArray[data.teacherIndex].id,
      students: data.value.join(','),
      mode: 2,
      intervalId: 12,
      remark: data.remark,
      scheduleId: data.id
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
      capacity: e.detail.value
    })
  },
  classRoomNameInput(e) {
    this.setData({
      classRoomName: e.detail.value
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
})
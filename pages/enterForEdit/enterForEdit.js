const http = require('../../utils/http.js');
const app = getApp();
import tips from '../../utils/tips.js';
const rootDocment = app.globalData.rootDocment;

function getToday() {
  let date = new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ipt_length: 0,
    id: 0,
    name_length: 0,
    content_length: 0,
    group_course_name: '',
    group_course_capacity: 0,
    date: getToday().join('-'),
    start_date: getToday().join('-'),
    end_date: getToday().join('-'),
    is_show_group: false,
    is_name_secret: false,
    is_split_commission: false,
    title: '标题',
    group_course_name: '项目一',
    group_course_image: '',
    group_course_path: './../../images/4.png',
    group_course_content: '课程内容',
    group_course_capacity: 0,
    group_course_price: 0,
    group_course_prepayment: 0,
    group_full_people_1: 0,
    group_full_price_1: 0,
    group_full_people_2: 0,
    group_full_price_2: 0,
    group_full_people_3: 0,
    group_full_price_3: 0,
    is_group_master_boon: false,
    group_master_boon: '请输入团长福利',
    mini_title_1: '活动说明',
    mini_content_1: '请输入活动说明',
    mini_image_1: '',
    mini_path_1: '',
    mini_path_2: '',
    mini_path_3: '',
    mini_title_2: '活动规则',
    mini_content_2: '请输入活动规则',
    mini_image_2: '',
    mini_title_3: '机构介绍',
    mini_content_3: '请输入机构介绍',
    mini_image_3: '',
    shop_hot_line: '咨询热线',
    shop_name: '门店名称',
    shop_address: '门店地址',
    shop_phone: '联系电话',
    user_info: '收集用户信息',
    user_name: '姓名',
    user_phone: '电话',
    user_school: '所在学校',
    user_class: '年级',
    banner_image: '',
    banner_path: '',
    boon_image: '',
    boon_path: '',
    spec_image: '',
    spec_path: '',
    spec_content: '请输入特别奖励',
    mc1_length: 0,
    mc2_length: 0,
    mc3_length: 0,
    sc_length: 0
  },

  lengthChange(e) {
    // console.log(e.detail.cursor)
    let ipt_length = e.detail.cursor;
    this.setData({
      ipt_length,
      title: e.detail.value
    })
  },
  courseNameChange(e) {
    let name_length = e.detail.cursor
    this.setData({
      name_length,
      group_course_name: e.detail.value
    })
  },
  capacityInput(e) {
    this.setData({
      group_course_capacity: e.detail.value
    })
  },
  priceInput(e) {
    this.setData({
      group_course_price: e.detail.value
    })
  },
  courseContentChange(e) {
    let content_length = e.detail.cursor
    this.setData({
      content_length,
      group_course_content: e.detail.value
    })
  },
  mc1Change(e) {
    let mc1_length = e.detail.cursor
    this.setData({
      mc1_length,
      mini_content_1: e.detail.value
    })
  },
  mc2Change(e) {
    let mc2_length = e.detail.cursor
    this.setData({
      mc2_length,
      mini_content_2: e.detail.value
    })
  },
  mc3Change(e) {
    let mc3_length = e.detail.cursor
    this.setData({
      mc3_length,
      mini_content_3: e.detail.value
    })
  },
  scChange(e) {
    let sc_length = e.detail.cursor
    this.setData({
      sc_length,
      spec_content: e.detail.value
    })
  },

  submitFn() {
    let data = this.data
    http.postReq('/api/Activity/Update', {
      id: data.id,
      banner_image: data.banner_image,
      title: data.title,
      start_date: data.start_date+' 00:00:00',
      end_date: data.end_date+' 00:00:00',
      group_course_name: data.group_course_name,
      group_course_image: data.group_course_image,
      group_course_capacity: data.group_course_capacity,
      group_course_price: data.group_course_price,
      group_course_content : data.group_course_content,
      mini_content_1: data.mini_content_1,
      mini_image_1: data.mini_image_1,
      mini_content_2: data.mini_content_2,
      mini_image_2: data.mini_image_2,
      mini_content_3: data.mini_content_3,
      mini_image_3: data.mini_image_3,
      spec_content : data.spec_content,
      spec_path  : data.spec_image 

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
  onLoad(options) {
    http.checkAuth()
    this.setData({
      id: options.id
    })
  },
  onShow() {
    this.loadData()
  },
  // loadData() {
  //   let id = this.data.id
  //   http.getReq('/api/Activity/Get?id=' + id, null, (res) => {
  //     if (res.ErrCode == 0) {

  //     } else {
  //       tips.error(res.ErrMsg)
  //     }
  //   })
  // },
  cancelImageTap(e) {
    let item = e.currentTarget.dataset.model
    let path = e.currentTarget.dataset.path
    this.setData({
      [item]: '',
      [path]: ''
    })
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
        console.log(item,path)
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
          console.log(item,path)
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

  // 输入监听
  inputWatch(e) {
    console.log(e);
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },
  loadData() {
    let id = this.data.id
    let that = this
    http.getReq('/api/Activity/Get?id=' + id, null, (res) => {
      if (res.ErrCode == 0) {
        let data = res.Response
        that.setData({
          id: data.id,
          banner_image: data.banner_image,
          banner_path: data.banner_path,
          title: data.title,
          ipt_length: data.title ? data.title.length : 0,
          start_date: data.start_date,
          end_date: data.end_date,
          group_course_image: data.group_course_image,
          group_course_path: data.group_course_path,
          group_course_name: data.group_course_name,
          group_course_content: data.group_course_content,
          name_length: data.group_course_name ? data.group_course_name.length : 0,
          content_length: data.group_course_content ? data.group_course_content.length : 0,
          group_course_capacity: data.group_course_capacity,
          group_course_price: data.group_course_price,
          mini_title_1: data.mini_title_1,
          mini_content_1: data.mini_content_1,
          mc1_length: data.mini_content_1 ? data.mini_content_1.length : 0,
          mini_image_1: data.mini_image_1,
          mini_path_1: data.mini_path_1,
          mini_title_2: data.mini_title_2,
          mini_content_2: data.mini_content_2,
          mc2_length: data.mini_content_2 ? data.mini_content_2.length : 0,
          mini_image_2: data.mini_image_2,
          mini_path_2: data.mini_path_2,
          mini_title_3: data.mini_title_3,
          mini_content_3: data.mini_content_3,
          mc3_length: data.mini_content_3 ? data.mini_content_3.length : 0,
          mini_image_3: data.mini_image_3,
          mini_path_3: data.mini_path_3,
          spec_content: data.spec_content,
          spec_image: data.spec_image,
          spec_path: data.spec_path,
          sc_length: data.spec_content ? data.spec_content.length : 0,
        })

      } else {
        tips.error(res.ErrMsg)
      }
    })
  },
  startDateChange(e) {
    this.setData({
      start_date: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      end_date: e.detail.value
    })
  },
})
import tips from "../../utils/tips";
const http = require('../../utils/http.js');
const app = getApp();
const rootDocment = app.globalData.rootDocment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartData: []
    },

    copyCourse: function (e) {
        let that=this;
        let id = e.currentTarget.dataset.id;
        http.getReq('/api/Course/Copy?id='+id,null,(res)=>{
           if(res.ErrCode===0){
            wx.showToast({
                title: '复制成功',
                success(){
                    that.loadData()
                }
            })
           }else{
               tips.error(res.ErrMsg)
           }
        })
    },
    deleteKeCheng: function (e) {
        let that=this;
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
                if (sm.confirm) {
                    http.getReq('/api/Course/Remove?id=' + id, null, (res) => {
                        if (res.ErrCode == 0) {
                            tips.success('删除成功')
                            that.loadData()
                        }
                    });
                }
            }
        })
    },

    addKecheng: function () {
        wx.navigateTo({
            url: '/pages/addKecheng/addKecheng',
        })
    },

    editCourse: function (e) {
        let that = this;
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/addKecheng/addKecheng?id=' + id,
        })
    },
    cnNameInput(e){
        this.setData({
            cn_name:e.detail.value
        })
    },
    loadData: function () {
        let that = this;
        let orgId=wx.getStorageSync('orgId')
        http.getReq('/api/Course/GetList?orgId='+orgId, null, (res) => {
            if (res.ErrCode == 0) {
                var response = res.Response;
                let arrList=new Array();
                for(let i=0;i<response.length;i++){
                    let data = {
                        id: response[i].id,
                        name: response[i].name,
                        image: response[i].image,
                        desc: response[i].content,
                        item:response[i].item
                    }
                    arrList.push(data)
                }
                
                that.setData({
                    cartData: arrList
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
        this.loadData();
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
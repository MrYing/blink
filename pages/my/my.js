import {
    ClassicModel
} from '../../models_cloud/classic.js'
import {
    BookModel
} from '../../models/book.js'

import {
    promisic
} from '../../util/common.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        bookCount: 0,
        classics: null,
        avatar: "/images/my/my.png"
    },
    onLoad: function() {
        this.userAuthorized();
    },
    onShow(options) {
        // this.userAuthorized1()
        this.getMyBookCount()
        this.getMyFavor()
        // wx.getUserInfo({
        //   success:data=>{
        //     console.log(data)
        //   }
        // })
    },

    getMyFavor() {
        classicModel.getMyFavor(res => {
            this.setData({
                classics: res
            })
        })
    },

    getMyBookCount() {
        bookModel.getMyBookCount()
            .then(res => {
                this.setData({
                    bookCount: res.count
                })
            })
    },

    // userAuthorized1() {
    //     promisic(wx.getSetting)()
    //         .then(data => {
    //             if (data.authSetting['scope.userInfo']) {
    //                 return promisic(wx.getUserInfo)()
    //             }
    //             return false
    //         })
    //         .then(data => {
    //             if (!data) return
    //             this.setData({
    //                 authorized: true,
    //                 userInfo: data.userInfo
    //             })
    //         })
    // },


    userAuthorized() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                authorized: true,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },



    onGetUserInfo(event) {
        const userInfo = event.detail.userInfo
        if (userInfo) {
            this.setData({
                userInfo,
                authorized: true
            })
        }
    },

    onJumpToAbout(event) {
        wx.navigateTo({
            url: '/pages/about/about',
        })
    },

    onStudy(event) {
        wx.navigateTo({
            url: '/pages/course/course',
        })
    },

    onJumpToDetail(event) {
        const cid = event.detail.cid
        const type = event.detail.type
        // wx.navigateTo
        wx.navigateTo({
            url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
        })
    }


})
import {
    ClassicModel
} from '../../models_cloud/classic.js'
import {
    LikeModel
} from '../../models_cloud/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Component({

    /**
     * 页面的初始数据
     */
    properties: {
        cid: Number,
        type: Number
    },

    data: {
        classic: null,
        latest: true,
        first: false,
        likeCount: 0,
        likeStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    attached(options) {
        const cid = this.properties.cid
        const type = this.properties.type
        if (!cid) {
            classicModel.getLatest((res) => {
                this.setData({
                    classic: res.data,
                    likeCount: res.data.fav_nums,
                    likeStatus: res.like_stauts.result.staut.data.length
                }) 
             })
        } else {
            classicModel.getById(cid, type, res => {
                this._getLikeStatus(res.data.id, res.data.type)
                this.setData({
                    classic: res.data,
                    latest: classicModel.isLatest(res.data.index),
                    first: classicModel.isFirst(res.data.index)
                })
            })
        }
    },

    methods: {
        onLike: function(event) {
            let behavior = event.detail.behavior
            likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
        },

        onNext: function(event) {
            const type = 'next'
            this._updateClassic(type)
        },

        onPrevious(event) {
            const type = 'previous'
            this._updateClassic(type)
        },

        _updateClassic: function(type) {
            let index = this.data.classic.index
            classicModel.getClassic(index, type, res => {
                this._getLikeStatus(res.id, res.type)
                this.setData({
                    classic: res,
                    latest: classicModel.isLatest(res.index),
                    first: classicModel.isFirst(res.index)
                })
            })
        },

        _getLikeStatus: function(artId, category) {
            likeModel.getClassicLikeStatus(artId, category, res => {
                this.setData({
                    likeCount: res.fav_num.data[0].fav_nums,
                    likeStatus: res.staut.data.length
                })
            })
        }
    }
})
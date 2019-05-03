import {
    HTTP
} from '../util/http.js'

class LikeModel extends HTTP {
    like(behavior, artID, category) {
        let func = behavior == 'like' ? 'like' : 'like_cancel'
        wx.cloud.callFunction({
            name: func,
            data: {
                id: artID,
                type: category
            }
        }).then( res => {
            console.log(res);
        })


        // let url = behavior == 'like' ? 'like' : 'like/cancel'
        // this.request({
        //     url: url,
        //     method: 'POST',
        //     data: {
        //         art_id: artID,
        //         type: category
        //     }
        // })
    }

    getClassicLikeStatus(artID, category, sCallback) {
        wx.cloud.callFunction({
            name: "classic_type_id_favor",
            data: {
                type: category,
                id: artID
            },
        }).then( res => {
            var res = res.result;
            console.log(res);
            sCallback(res)
        })
        // this.request({
        //     url: 'classic/' + category + '/' + artID + '/favor',
        //     success: sCallback
        // })
    }
}

export {
    LikeModel
}
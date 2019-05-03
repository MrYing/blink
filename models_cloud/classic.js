class ClassicModel {
    getLatest(sCallback) {

        // 当然 promise 方式也是支持的
        wx.cloud.callFunction({
            name: 'classic_latest',
            data: {}
        }).then(res => {
            var res = res.result.res;
            sCallback(res)
            this._setLatestIndex(res.data.index)
            let key = this._getKey(res.data.index)
            wx.setStorageSync(key, res.data)
        })
        // this.request({
        //     url: 'classic/latest',
        //     success: (res) => {
        //         sCallback(res)
        //         this._setLatestIndex(res.data.index)
        //         let key = this._getKey(res.data.index)
        //         wx.setStorageSync(key, res.data)
        //     }
        // })
    }

    getClassic(index, nextOrPrevious, sCallback) {
        // 缓存中寻找 or API 写入到缓存中
        // key 确定key
        let key = nextOrPrevious == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            wx.cloud.callFunction({
                name: 'classic_index_' + nextOrPrevious,
                data: {
                    index: index
                }
            }).then(res => {
                var res = res.result.res;
                wx.setStorageSync(
                    this._getKey(res.data[0].index), res.data[0])
                sCallback(res.data[0])
            })
            // this.request({
            //     url: `classic/${index}/${nextOrPrevious}`,
            //     success: (res) => {
            //         wx.setStorageSync(
            //             this._getKey(res.data.index), res.data)
            //         sCallback(res.data)
            //     }
            // })
        } else {
            sCallback(classic)
        }
    }


    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }


    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }

    getById(cid, type, success) {
        let params = {
            url: `classic/${type}/${cid}`,
            success: success
        }
        this.request(params)
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex() {
        const index = wx.getStorageSync('latest')
        return index
    }

    _getKey(index) {
        const key = 'classic-' + index
        return key
    }
}


export {
    ClassicModel
}
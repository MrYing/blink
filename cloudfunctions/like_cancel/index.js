// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'ice-dev-c5bab2'
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()
    try {
        var res = await db.collection("like").where({
            type: event.type,
            id: event.id
        }).remove()
    } catch (e) {
        console.error(e)
    }

    try {
        var res_fav_nums = await db.collection('classic').where({
            type: event.type,
            id: event.id
        }).update({
            data: {
                fav_nums: _.inc(-1)
            }
        })
    } catch (e) {
        console.error(e)
    }

    console.log(res);
    return {
        res,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}
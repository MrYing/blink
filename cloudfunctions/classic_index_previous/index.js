// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'ice-dev-c5bab2'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const res = await db.collection("classic")
        .where({index: event.index-1}).get()
    console.log(res);

    return {
        res,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}
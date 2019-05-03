// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'ice-dev-c5bab2'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const staut = await db.collection("like").where({
        type: event.type,
        id: event.id
    }).get()
    const fav_num = await db.collection("classic")
        .where({
            type: event.type,
            id: event.id
        })
        .limit(1)
        .field({
            fav_nums: true
        })
        .get()
   

    console.log(staut);
    console.log(fav_num);

    return {
        staut,
        fav_num,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}
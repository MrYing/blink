// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'ice-dev-c5bab2'
})

const db = cloud.database()


// 云函数入口函数
exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()
    const res = await db.collection("classic")
        .orderBy("index", "desc")
        .limit(1)
        .get()
        .then(async res => {
            var res = res.data[0];
            console.log("type" + res.type + ";" + "id" + res.id)
            var like_stauts = await cloud.callFunction({
                name: "classic_type_id_favor",
                data: {
                    type: res.type,
                    id: res.id
                }
            })

            var classic = {};
            classic.data = res;
            classic.like_stauts = like_stauts;
            return classic;
        })

    return {
        res,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}
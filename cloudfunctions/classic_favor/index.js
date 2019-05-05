// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'ice-dev-c5bab2'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()

    const res = await db.collection("like").get().then( async res => {
        var data = res.data;
        // 返回的数据集
        var data_list = new Array();

        for (var x = 0; x < data.length; x++) {
            // console.log(data[x]}
            var id = data[x]['id']
            var type = data[x]['type']
            // console.log(id, type)

            var classic = await db.collection("classic").where({
                id: id,
                type: type
            }).get().then(classic_res => {
                // console.log(classic_res.data[0])
                return classic_res.data[0]

            })

            // console.log(classic);
            data_list[x] = classic;
        }
        // console.log(data_list);
        // console.log(res.data)
        return data_list;
    })
    // console.log(res);

    return {
        res,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}
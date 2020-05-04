/*
 * Telegram @ZaiBanAFK
 * Description:MG想做一个机器人
 */
//第一次运行时用，可以用来看room.id 和 msg.type

const { Message } = require("wechaty")
const config = require("../config/config")
// 机器人名字
const name = config.name
// 管理群组列表
const roomList = config.room.roomList

// 消息监听回调
module.exports = bot => {
  return async function onMessage(msg) {
    // 判断消息来自自己，直接return
    if (msg.self()) return
    if (msg.age() > 60) return

    console.log("=============================")
    console.log(`msg : ${msg}`)
    console.log(
        `from: ${msg.from() ? msg.from().name() : null}: ${
            msg.from() ? msg.from().id : null
        }`
    )
    console.log(`type:${msg.type()}`)
    console.log(`to: ${msg.to()}`)
    console.log(`text: ${msg.text()}`)
    console.log(`isRoom: ${msg.room()}`)
    console.log(`isRoomID: ${msg.room() ? msg.room().id : null}`)
    console.log("=============================")
  }
}

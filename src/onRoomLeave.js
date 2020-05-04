/*
 * Telegram @ZaiBanAFK
 * Description:MG想做一个机器人
 */

// 配置文件
const config = require("../config/config")
// 管理群组列表
const roomList = config.room.roomList

module.exports = async function onRoomLeave(room, leaverList) {
  room.sync()
  const roomname = await room.topic()
  const nameList = leaverList.map(c => c.name())
  console.log(`${roomname} lost member ${nameList}`)
  const roomsend = await bot.Room.find({id: "20109172092@chatroom" })
  roomsend.say("${roomname} lost member ${nameList}")
}

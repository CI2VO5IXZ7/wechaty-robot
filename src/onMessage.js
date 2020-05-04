/*
 * Telegram @ZaiBanAFK
 * Description:MG想做一个机器人
 */
const { Message } = require("wechaty")
const nodemailer = require('nodemailer')
const config = require("../config/config")
const BC = config.room.roomList.Boardcast
const WK = config.room.roomList.Work
const TS = config.room.roomList.Test
const TD = config.room.roomList.ToDo
const CL = config.room.roomList.Collect

// 消息监听回调
module.exports = bot => {
  return async function onMessage(msg) {
    // 判断消息来自自己，直接return
    if (msg.self()) return
    // 消息时间太久，无用消息，直接return
    if (msg.age() > 60) return
    /*
    // 显示消息的log，关闭显示
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
    */
    // 判断消息来自群聊 私聊默认不回复 由自己在手机上回复
    if (msg.room()) {
    //  if (await Test(bot,msg)) return
      if (await Boardcast(bot,msg)) return // 消息转发 目前只支持文字转发，群公告转发，公众号文章转发
      if (await MailToDida(msg)) return  // 转发消息给我的滴答清单
      if (await InoreaderAgent(msg)) return // 发送给inoreader
      if (await Jielong(bot,msg)) return //将接龙信息发送到broadcast
    }
  }
}
/*
async function Test(bot,msg) {
  if (msg.room().id == TS) {
    let n = msg.type()
    if (n == 6) {
      const file =await msg.toFileBox()
      const name = file.name
      console.log('Save file to: ' + name)
      await file.toFile(name)
      const room = await bot.Room.find({id: CL })
      room.say(file)
    }
    // n == 13 公众号文章
    else if (n == 14 || n == 9 ) {
      const room = await bot.Room.find({id: CL })
      await msg.forward(room)
    }
    // n == 7 文字
    else if (n == 7) {
      const room = await bot.Room.find({id: CL })
      // 如果有@所有人 是群公告
      if (msg.toString().search("@所有人")!= -1) {
        const oldAnnounce = await room.announce(msg.text().replace("@所有人",""))
      }
      // 普通群消息转发
      else {
        await msg.forward(room)
      }
    }
    // 不支持的转发
    else {
      const room = await msg.room()
      await room.say("不支持转发此类型的消息哦")
    }
    return true
  }
  return false
}

*/
async function Boardcast(bot,msg) {
  if (msg.room().id == BC) {
    let n = msg.type()
    // n == 6 图片
    if (n == 6) {
      const file =await msg.toFileBox()
      const name = file.name
      console.log('Save file to: ' + name)
      await file.toFile(name)
      const room = await bot.Room.find({id: WK })
      room.say(file)
    }
    // n == 14、9 公众号文章和小程序
    else if (n == 14 || n == 9) {
      const room = await bot.Room.find({id: WK })
      await msg.forward(room)
    }
    // n == 7 文字
    else if (n == 7) {
      const room = await bot.Room.find({id: WK })
     // 如果有@所有人 是群公告
      if (msg.toString().search("@所有人")!= -1) {
        const oldAnnounce = await room.announce(msg.text().replace("@所有人",""))
      }
    // 普通群消息转发
      else {
        await msg.forward(room)
      }
    }
    else if (n == 10) {
      let data = msg.text()
      const room = await bot.Room.find({id: WK })
      room.say(data)
    }
    // 不支持的转发
    else {
      const room = await msg.room()
      await room.say("不支持转发此类型的消息哦")
    }
    return true
  }
  return false
}

async function MailToDida(msg) {
  if(msg.room().id == TD ){
    const room = await msg.room()
    if (msg.type() == 7) {
      let title = msg.text()
      let mailOptions = {
        from: '"XXX的机器人" <123@123.com>', // 发送者昵称和地址
        to: config.DidaAddress, // 接收者的邮箱地址
        subject: title, // 邮件主题
        text: '机器人发送的待办事项',  //邮件的text
      }
      mailSend(mailOptions,(err,info)=>{
        if(err){
          console.log("邮件发送失败")
          room.say("好像哪里出了问题诶")
        }
        console.log("邮件发送成功成功")
        room.say("已经成功给你把邮件发出去咯")
      })
    }
    else {
      room.say("只支持发送文字到滴答清单哦")
    }
  return true
  }
  return false
}

async function InoreaderAgent(msg){
  if (msg.room().id == CL && msg.type() == 13) {
    const room = await msg.room()
    requestData = msg.text()
    let regExp1 = /<shareUrlOpen>(([\s\S]*?))<\/shareUrlOpen>?/g
    let regExp2 = /<title>(([\s\S]*?))<\/title>?/g
    let url = requestData.match(regExp1).toString().replace(/<shareUrlOpen>/,'').replace(/<\/shareUrlOpen>/,'')
    let title = requestData.match(regExp2).toString().replace(/<title>/,'').replace(/<\/title>/,'').replace(/,<title>null<\/title>/,'')
    let mailOptions = {
      from: '"XXX的机器人" <123@123.com>', // 发送者昵称和地址
      to: config.InoreaderAddress, // 接收者的邮箱地址
      subject: title, // 邮件主题
      text: url,  //邮件的text
    }
    mailSend(mailOptions,(err,info)=>{
      if(err){
        console.log("邮件发送失败")
        room.say("好像哪里出了问题诶")
      }
      console.log("邮件发送成功成功")
      room.say("已经成功给你把邮件发出去咯")
    })
    return true
  }
  return false
}

async function Jielong(bot,msg) {
  let m = msg.type()
  if (msg.room().id == CL && msg.type() == 10) {
    console.log("看起来有人接龙了")
    data = msg.text()
    const room = await bot.Room.find({id: BC })
    room.say(data)
    return true
  }
  return false
}

function mailSend(options,callback) {
  let transporter = nodemailer.createTransport({
    service: 'FastMail', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {   //发送者的账户密码
      user: '123@123.com', //账户
      pass: '1234567890', //smtp授权码，到邮箱设置下获取
    }
  })
  transporter.sendMail(options, (error, info) => {
    callback && callback(error, info)
  })
}

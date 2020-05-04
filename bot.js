/*
 * Telegram @ZaiBanAFK
 * Description:MG想做一个机器人
 */

const { Wechaty } = require("wechaty") // Wechaty核心包
const { PuppetPadplus } = require("wechaty-puppet-padplus") // padplus协议包
const config = require("./config/config") // 配置文件

const onScan = require("./src/onScan") // 机器人需要扫描二维码时监听回调
const onFirst = require("./src/onFirst")

const bot = new Wechaty({
    puppet:new PuppetPadplus({
        token: config.token
    }),
    name:config.name
})

bot
    .on("scan", onScan)
    .on('login',       user => console.log(`User ${user} logined`))
    .on('message', onFirst(bot))
    .start()
/*
 * Telegram @ZaiBanAFK
 * Description:MG想做一个机器人
 */

const Qrterminal = require("qrcode-terminal")

module.exports = function onScan(qrcode, status) {
  console.log(qrcode)
  Qrterminal.generate(qrcode, { small: true })
}

# wechaty-robot
一个自己使用的机器人


目前的基础功能包含：群消息转发，消息转发到嘀嗒收件箱，公众号文章转发到inoreader收件箱。
#群组列表
|群组|功能|
|---|---|
|Boardcast|转发群，机器人会将群里的消息转发到Work群|
|Work|代购群，其中群里的接龙消息会转发到Boardcast群|
|ToDo|会将你的消息发送到嘀嗒清单的收件箱|
|Collect|会将你转发的公众号消息链接转发给Inoreader，用Inoreader进行全文阅读|
|Test|主要用来测试功能|

#使用 
npm install
第一次运行 node bot.js 讲自己需要的room.id记录下来，然后配置config中的群组id及相关配置。并将config-example.js改为config.js
刚开始需要运行node index.js，之后可以用pm2进行启动。

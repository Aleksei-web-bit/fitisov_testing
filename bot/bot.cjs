const { Telegraf } = require('telegraf');
const bot = new Telegraf('7092969890:AAHukOvFRgIAYmOe2ZHMfv8N4WQdK-gXHp8');

bot.start((ctx) => ctx.reply('Привет! Я FitisovBot!'));

bot.on('text', (ctx) => ctx.reply('Взаимно' + ctx.message.text));

bot.launch();

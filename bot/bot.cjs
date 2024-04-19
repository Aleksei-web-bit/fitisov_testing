const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');

// Объект для хранения данных об авторизованных пользователях
const authorizedUsers = {};

bot.start((ctx) => ctx.reply('Привет! Я FitisovBot!'));

// Команда для авторизации с использованием ключа
bot.command('auth', (ctx) => {
    // Проверяем, отправил ли пользователь ключ вместе с командой
    const key = ctx.message.text.split(' ')[1];
    if (key === 'YOUR_AUTH_KEY') {
        authorizedUsers[ctx.message.from.id] = true;
        ctx.reply('Вы успешно авторизованы!');
    } else {
        ctx.reply('Неверный ключ авторизации.');
    }
});

// Обработчик текстовых сообщений только для авторизованных пользователей
bot.on('text', (ctx) => {
    const userId = ctx.message.from.id;
    if (authorizedUsers[userId]) {
        ctx.reply('Взаимно ' + ctx.message.text);
    } else {
        ctx.reply('Пожалуйста, сначала авторизуйтесь с помощью /auth YOUR_AUTH_KEY');
    }
});

// Команда для регистрации имени пользователя
bot.command('register', (ctx) => {
    const fullName = ctx.message.text.split(' ')[1];
    // В этом примере просто сохраняем полное имя в объекте authorizedUsers, 
    // но в реальном приложении вы, вероятно, захотите сохранить его в базе данных.
    authorizedUsers[ctx.message.from.id] = { fullName };
    ctx.reply('Спасибо за регистрацию, ' + fullName + '!');
});

bot.launch();

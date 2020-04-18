require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  let channel = msg.channel;
  let member = msg.member;
  let allowedRoles = ["docente"];

  if(msg.content == '!delete') {
    if(member.roles.some(role => allowedRoles.some(allowedRole => allowedRole == role.name))) {
      channel.fetchMessages().then(messages => channel.bulkDelete(messages.size));
    }
    else {
      msg.reply(", Ojito eh, no tenes permisos para eliminar estos mensajes!")
    }
  }
  
});

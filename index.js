require('dotenv').config();
const Discord = require('discord.js');
const commands = require('./commands/index')
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  commands.forEach(command => {
    if(command.name == msg.content) {
      command.execute(msg, command.allowedRoles);
    }
  });
});

require('dotenv').config();
const Discord = require('discord.js');
const commands = require('./commands/index')
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  const commandToExec = commands.find(command => command.name == msg.content)
  if(commandToExec) await commandToExec.execute(msg, commandToExec.allowedRoles)
});

const deleteMessages = (msg, allowedRoles) => {
    let channel = msg.channel;
    let member = msg.member;

    if(member.roles.some(role => allowedRoles.some(allowedRole => allowedRole == role.name))) {
        channel.fetchMessages().then(messages => channel.bulkDelete(messages.size));
    }
    else {
      msg.reply(", Ojito eh, no tenes permisos para eliminar estos mensajes!");
    }

}

module.exports = deleteMessages;
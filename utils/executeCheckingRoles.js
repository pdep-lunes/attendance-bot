const executeCheckingRoles = (message, allowedRoles, func) => {
    if(message.member.roles.some(role => allowedRoles.some(allowedRole => allowedRole == role.name))) {
        func()
    }
    else {
        message.reply(", Ojito eh, no tenes permisos para eliminar estos mensajes!");
    }
}

module.exports = executeCheckingRoles


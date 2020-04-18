const deleteMessages = require('./deleteMessages');

const commands = [{
    name: "!delete",
    execute: deleteMessages,
    allowedRoles: ["docente"]
}]

module.exports = commands
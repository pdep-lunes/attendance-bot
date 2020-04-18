const deleteMessages = require('./deleteMessages');
const takeAttendance = require('./takeAttendance');

const commands = [{
    name: "!delete",
    execute: deleteMessages,
    allowedRoles: ["docente"]
},{
    name: "!takeAttendance",
    execute: takeAttendance,
    allowedRoles: ["docente"]
}]

module.exports = commands
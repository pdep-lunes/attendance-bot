const deleteMessages = require('./deleteMessages');
const takeAttendance = require('./takeAttendance');
const ghci = require('./ghci');

const commands = [{
    name: "!delete",
    execute: deleteMessages,
    allowedRoles: ["docente"]
}, {
    name: "!takeAttendance",
    execute: takeAttendance,
    allowedRoles: ["docente"]
}, {
    name: "!ghci ",
    execute: ghci,
    allowedRoles: ["docente", "estudiante"]
}]

module.exports = commands

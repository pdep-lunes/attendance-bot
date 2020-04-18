const executeCheckingRoles = require('../utils/executeCheckingRoles')

const deleteMessages = (msg, allowedRoles) => {
    let channel = msg.channel;

    executeCheckingRoles(msg, allowedRoles, () => {
        channel.fetchMessages().then(messages => channel.bulkDelete(messages.size));
    })
}

module.exports = deleteMessages
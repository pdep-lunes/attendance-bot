const executeCheckingRoles = require('../utils/executeCheckingRoles')

const deleteMessages = (msg, allowedRoles) => {
    let channel = msg.channel;
    executeCheckingRoles(msg, allowedRoles, async () => {
        const messages = await channel.fetchMessages()
        channel.bulkDelete(messages.size);
    })
}

module.exports = deleteMessages
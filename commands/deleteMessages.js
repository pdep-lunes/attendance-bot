const executeCheckingRoles = require('../utils/roles')

const deleteMessages = async (msg, allowedRoles) => {
    let channel = msg.channel;
    await executeCheckingRoles(msg, allowedRoles, async () => {
        const messages = await channel.fetchMessages()
        channel.bulkDelete(messages.size);
    })
}

module.exports = deleteMessages

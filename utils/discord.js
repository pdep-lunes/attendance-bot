const { isSameDay } = require("./dates");

const getAttendanceFrom = async (channel, filterDate) => {
    const peopleMessages = await channel.fetchMessages();
    const filteredMessages = peopleMessages.array().filter(message => isSameDay(new Date(message.createdTimestamp), filterDate));
    const mappedMessages = filteredMessages.map(message => message?.author?.username);
    const usersWithoutDuplicates = new Set(mappedMessages);
    console.log(usersWithoutDuplicates);
    return new Set(mappedMessages);
}

const sendErrorToAuthor = (author, command, message) => author.send(`Hubo un error con el comando '${command}': ${message}`);

module.exports = {
    getAttendanceFrom, 
    sendErrorToAuthor
};

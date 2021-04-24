const { isSameDay } = require("./dates");

const getAttendanceFrom = async (channel, filterDate) => {
    const peopleMessages = await channel.fetchMessages()
    return new Set(peopleMessages
        .filter(message => isSameDay(new Date(message.createdTimestamp), filterDate))
        .map(message => message?.member?.user?.username)
        );
}

module.exports = getAttendanceFrom;

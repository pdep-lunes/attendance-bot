const getAttendanceFrom = async channel => {
    const people = await channel.fetchMessages()
    return new Set(people.map(message => message.member.user.username))
}

module.exports = getAttendanceFrom
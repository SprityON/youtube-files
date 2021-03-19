function spamCheck(msg, set, time) {
    if (msg.member.roles.cache.find(role => role.name === 'Muted')) return

    let bool = false // the bool will be set to true if a member was found in the set object

    // 'times' is the amount of messages
    let user = { id: msg.author.id, time: Date.now(), times: 2 }

    for (let u of set) {
        // sometimes the 'times' would say that it was not a number. this fixes it
        if (isNaN(u.times)) u.times = 2

        // if the u.id coincides with the msg.author.id, then run the following code
        if (u.id === msg.author.id) {
            bool = true // the bool was set to true because the member was found

            if (u.times >= 5) {
                msg.reply(`Woah, not so fast!`)

                let muterole = msg.guild.roles.cache.find(role => role.name === 'Muted')
                if (!msg.member.roles.cache.has(muterole.id)) {
                    msg.member.roles.add(muterole)

                    // remove the role and the member from the set after 5 seconds
                    setTimeout(() => {
                        msg.member.roles.remove(muterole)
                        set.delete(u)
                        msg.channel.send('unmuted')
                    }, 5000);
                }
            } else if ((Date.now() - u.time) <= time) {
                // if the amount of time is less then 'time', then...
                u.times++
                u.time = Date.now()
            }
        }
    }

    // if this bool remains false, then add the user to the set
    if (bool === false) {
        set.add(user)
    }
}

// export this file so we can require it in another file, in this case bot.js
module.exports = { spamCheck }
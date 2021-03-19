// require dotenv for token-hiding purposes
require('dotenv').config()

// require the needed modules
const Discord = require('discord.js')
const client = new Discord.Client()

// fire the ready event
client.once('ready', () => {
    console.log('ready')
})

// create a new object from the Set() class
let set = new Set()

// fire the message event
client.on('message', msg => {
    // if the user is a bot then exit
    if (msg.member.user.bot === true) return

    // require the functions file which we will be getting our function from
    const functions = require('./functions')

    // use the function: spamCheck(the message, the object of the Set() class, amount of ms)
    // if you put 1000 ms, then it will wait 1 full second. if there are 5 messages in one second from 1 member, then it will run some code.
    functions.spamCheck(msg, set, 10000)
})

// replace 'YOUR_TOKEN_HERE' with your token 
client.login(YOUR_TOKEN_HERE)
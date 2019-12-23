// const express = require('express')
// const bodyParser = require('body-parser')
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

client.messages.create({
    to: '+17866780894',
    from: '+12282060041',
    body: 'This is my first message with twilio and node',
}).then(message => console.log(message.sid))

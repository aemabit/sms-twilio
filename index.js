const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')();
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const myNumber = process.env.TWILIO_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken)

const app = express()

// SETTINGS
app.set('port', process.env.PORT || 8000)

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(pino)

// ROUTES
app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json')
    client.messages.create({
        to: req.body.to,
        from: myNumber,
        body: 'This is my first message with twilio and node',
    })
    .then(() => {
        res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
    });
})

// STARTING SERVER
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})


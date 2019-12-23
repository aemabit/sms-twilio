const express = require('express')
const bodyParser = require('body-parser')
// const pino = require('express-pino-logger')();
const cors = require('cors')
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const myNumber = process.env.TWILIO_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken)

const app = express()

// SETTINGS
app.set('port', process.env.PORT || 8000)

// MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES
app.get('/', (req, res) => {
    res.send("Hello this works")
})

app.post('/api/messages', (req, res) => {
    // res.header('Content-Type', 'application/json')
    client.messages.create({
        to: req.body.number,
        from: myNumber,
        body: req.body.msg,
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


const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Server running...'));

app.get('/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
            user : process.env.USERMAIL,
            pass : process.env.USERPASS
        }
    });
    transporter.sendMail({
        from: process.env.USERMAIL,
        to: process.env.DESTMAIL,
        replyTo: process.env.USERMAIL,
        subject: 'Test',
        text: 'Test'
    }).then(info => {
        console.log(info);
        res.send('Email sent!');
    }).catch(err => {
        console.log(err);
        res.send('Email not sent!');
    });
});

app.listen(port, () => console.log(`Running on port ${port}!`));
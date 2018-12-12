'use strict';

const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const config = require('./config')

let url = `smtps://${config.emailPrefix}%40${config.emailSufix}:${encodeURIComponent(config.password)}@smtp.gmail.com:465`;
let transporter = nodemailer.createTransport(url);

module.exports = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let email = {
        from: `"${config.name}" <${config.emailPrefix}@${config.emailSufix}>`,
        to: req.body['to'],
        subject: req.body['subject'],
        text: req.body['text'],
        html: req.body['html']
    };

    transporter.sendMail(email, (error, info) => {
        if (error) 
          res.send({status: "NOK", message : error, email: email});        
        else
          res.send({status: "OK", message : info.response, messageId: info.messageId, email: email});
    });
  });
});
'use strict';

const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const config = require('./config')

let url = `smtps://${config.emailPrefix}%40${config.emailSufix}:${encodeURIComponent(config.password)}@smtp.gmail.com:465`;
let transporter = nodemailer.createTransport(url);

module.exports = functions.https.onCall((data) => {
  let email = {
      from: `"${config.name}" <${config.emailPrefix}@${config.emailSufix}>`,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
  };     

  let res = transporter.sendMail(email)
    .then(info => {
      return {status: "OK", message: info.response, messageId: info.messageId}
    })
    .catch(error => {
      return {status: "NOK", message: error}
    })  
  return res;
});
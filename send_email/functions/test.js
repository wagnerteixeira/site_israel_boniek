var nodemailer = require('nodemailer');
const config = require('./config')

let url = `smtps://${config.emailPrefix}%40${config.emailSufix}:${encodeURIComponent(config.password)}@smtp.gmail.com:465`;
let transporter = nodemailer.createTransport(url);

let data = {
  to: 'wagnerbernardesteixeira@gmail.com',
  subject: 'TESTE DE EMAIL ENVIADO',
  text: '',
  html: 'Html teste',
};

let email = {
  from: `"${config.name}" <${config.emailPrefix}@${config.emailSufix}>`,
  to: data.to,
  subject: data.subject,
  text: data.text,
  html: data.html
};


let res = transporter.sendMail(email).then(info => {    
  console.log({status: "OK", message: info.response, messageId: info.messageId});
  return true;
}).catch(error => {
  console.log({status: "NOK", message: error})
  return false  
});




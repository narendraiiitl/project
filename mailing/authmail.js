var nodemailer = require('nodemailer');

/////////////////////node mailer//////////////////

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lcs2019015@iiitl.ac.in',
      pass: 'test1234'
    }
  });
  
  function sendmail(mail, token) {
  
    const mailOptions = {
      from: 'lcs2019015@iiitl.ac.in',
      to: mail,
      subject: 'authentication msg',
      html: `please click the link to complete registration: <a href="/signup/conformation/:"${token}"> click here</a>`
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });
  
  }
  /////////////////////node mailer//////////////////
  module.exports = sendmail;

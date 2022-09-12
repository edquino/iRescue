const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "AKIA2NQI527SEA23GAOK",
      pass: "BIrAq+1myzXHizbtum/JHORcRCkUnv/6v0E5YNhA0hdK"
      //pass: "NextServices2021#"
    },
    tls: {
        rejectUnauthorized: false
    }
});


const sendEmail = async (from,to,subject,text) => {
    return new Promise((resolve,reject) => {
   
        var mailOptions = {
            from,
            to,
            subject,
            text
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(new Error(error));
            } else {
               resolve(true);
            }
        });

    });
 
}


module.exports = sendEmail;
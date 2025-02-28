const nodeMailer = require("nodemailer");



const sendEmail = async(options) =>{

    const transporter = nodeMailer.createTransport({
        service:"gmail",
        secure:"true",
       auth:{
         user:process.env.SMPT_MAIL,
         pass:process.env.SMPT_PASS,
        }
    });

    const mailOptions = {
         from:process.env.SMPT_MAIL,
         to:options.to,
         subject:options.subject,
         html:options.message,
    };

    await transporter.sendMail(mailOptions);


};

module.exports = sendEmail;
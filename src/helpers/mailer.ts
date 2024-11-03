import nodemailer from 'nodemailer';



export const sendEmail = async ({ email, emailType, userId }:any)=>
{
    try{
        //todo: configure mail for usage 

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

        const mailOptions = {
            from: 'testmail@gmail.com', 
            to: email, 
            subject: emailType === 'VERIFY' ? "verify you email" : "Rest Your Password" , 
            html: "<b>Hello world?</b>",
          };

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    }catch(error : any){
        throw new Error(error.message)
    }
}
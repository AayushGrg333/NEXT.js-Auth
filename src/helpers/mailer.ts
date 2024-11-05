import User from "@/models/userModel";
import nodemailer from "nodemailer";

import { v4 as uuidv4 } from "uuid";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = uuidv4();

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType == "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokanExpiry: Date.now() + 3600000,
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c7aa4ce17c6283",
                pass: "7738db565eb397",
            },
        });

        const mailOptions = {
            from: "testmail@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "verify you email"
                    : "Reset Your Password",
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "verify you email"
                    : "Reset Your Password"
            } or copy and and paste the link below in your browser<br>${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}</p>`,
        };


        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

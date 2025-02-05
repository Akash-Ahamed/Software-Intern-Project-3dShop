import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // Generate a hashed token for verification or password reset
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Configure nodemailer transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "27e8823998682c",
        pass: "2651f04c163a58",
      },
    });

    // Create email options
    const mailOptions = {
      from: "akash.ahamed.engr@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "Please click the link below.",
      html: `
        <p>
          Click <a href="${
            process.env.DOMAIN
          }/verifyemail?token=${hashedToken}">Here</a> 
          to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          } 
          or copy and paste the link below into your browser.
        </p>
        <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
      `,
    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

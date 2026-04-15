import nodemailer from 'nodemailer';
import crypto from 'crypto';

const sendVerificationEmail = async (toEmail, token) => {
    let host = process.env.SMTP_HOST || 'smtp.ethereal.email';
    let port = parseInt(process.env.SMTP_PORT) || 587;
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        const testAccount = await nodemailer.createTestAccount();
        user = testAccount.user;
        pass = testAccount.pass;
        host = 'smtp.ethereal.email';
        port = 587;
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
            user,
            pass,
        },
    });

    const verificationLink = `http://${process.env.HOST || 'localhost'}:${process.env.SERVER_PORT || 3001}/api/auth/verify-email/${token}`;
    const currentYear = new Date().getFullYear();

    const emailHtmlContent = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                    <tr>
                        <td style="background-color:#003366; padding:20px; text-align:center;">
                            <h2 style="color:#ffffff; margin:0; font-weight: 600;">Adwa Logistics</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:40px 30px; color:#333333; font-size:16px; line-height:1.6;">
                            <h3 style="margin-top:0; color:#003366;">Verify Your Email Address</h3>
                            <p>Thank you for choosing Adwa Logistics! To complete your registration and secure your account, please verify your email address by clicking the button below.</p>
                            
                            <div style="text-align:center; margin:40px 0;">
                                <a href="${verificationLink}" style="background-color:#003366; color:#ffffff; padding:15px 30px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">Verify Email Now</a>
                            </div>
                            
                            <p style="font-size:14px; color:#666666;">If the button doesn't work, copy and paste this link into your browser:</p>
                            <p style="font-size:14px; color:#003366; word-break:break-all;"><a href="${verificationLink}">${verificationLink}</a></p>
                            
                            <p style="margin-top:40px;">Best Regards,<br/><strong>The Adwa Logistics Team</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#999999; border-top:1px solid #eeeeee;">
                             © ${currentYear} Adwa Logistics Pvt. Ltd. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: toEmail,
        subject: 'Verify your email - Adwa Logistics',
        text: `Please verify your email by clicking on the following link: ${verificationLink}`,
        html: emailHtmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
};

const sendConfirmationEmail = async (toEmail, username) => {
    let host = process.env.SMTP_HOST || 'smtp.ethereal.email';
    let port = parseInt(process.env.SMTP_PORT) || 587;
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        const testAccount = await nodemailer.createTestAccount();
        user = testAccount.user;
        pass = testAccount.pass;
        host = 'smtp.ethereal.email';
        port = 587;
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    });

    const currentYear = new Date().getFullYear();

    const emailHtmlContent = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                    <tr>
                        <td style="background-color:#28a745; padding:20px; text-align:center;">
                            <h2 style="color:#ffffff; margin:0; font-weight: 600;">Adwa Logistics</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:40px 30px; color:#333333; font-size:16px; line-height:1.6;">
                            <h3 style="margin-top:0; color:#28a745;">Registration Successful!</h3>
                            <p>Hi <strong>${username}</strong>,</p>
                            <p>Good news! Your email address has been successfully verified. Your Adwa Logistics account is now fully active.</p>
                            
                            <p>You can now log in to access all our logistics services and manage your shipments seamlessly.</p>
                            
                            <div style="text-align:center; margin:40px 0;">
                                <a href="http://${process.env.HOST || 'localhost'}:${process.env.SERVER_PORT || 3001}/login" style="background-color:#28a745; color:#ffffff; padding:15px 30px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">Go to Login</a>
                            </div>
                            
                            <p style="margin-top:40px;">Welcome aboard,<br/><strong>The Adwa Logistics Team</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#999999; border-top:1px solid #eeeeee;">
                             © ${currentYear} Adwa Logistics Pvt. Ltd. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: toEmail,
        subject: 'Email Verified Successfully - Adwa Logistics',
        text: `Hi ${username},\n\nYour email has been successfully verified. You can now log in to your account.`,
        html: emailHtmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
};

const sendAdminLoginNotification = async (data) => {
    let host = process.env.SMTP_HOST || 'smtp.ethereal.email';
    let port = parseInt(process.env.SMTP_PORT) || 587;
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        const testAccount = await nodemailer.createTestAccount();
        user = testAccount.user;
        pass = testAccount.pass;
        host = 'smtp.ethereal.email';
        port = 587;
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    });

    const currentYear = new Date().getFullYear();
    const contactIdMd5 = crypto.createHash('md5').update(data.contact_id.toString()).digest('hex');

    const emailHtmlContent = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0; font-family: Arial, sans-serif;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:6px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:14px; line-height:1.6;">
                            <p>Hello <strong>${data.fname}</strong>,</p>

                            <p>
                                We noticed a login to your account (ID: ${data.seller_id}) from your credentials. Was this you?<br/><br/>
                                <b>If this was you</b><br/><br/>
                                You may ignore the email. No action is needed further.<br/><br/>
                                <b>If this wasn't you</b><br/><br/>
                                Please report to our technical assistance team at <a href="mailto:[EMAIL_ADDRESS]">[EMAIL_ADDRESS]</a> immediately.<br/><br/>
                            </p>
                            <span style="display:none;">${contactIdMd5}</span>
                            <p style="margin-top:20px; margin-bottom:10px;">
                                <strong>Thanks</strong>
                                <br/>
                                <strong>Adwa Logistics Pvt. Ltd.</strong>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                            © ${currentYear} Adwa Logistics Pvt. Ltd. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: data.email,
        subject: "Admin Secure Token for Seller Login Access",
        html: emailHtmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
};

export { sendVerificationEmail, sendConfirmationEmail, sendAdminLoginNotification };

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { render } from "@react-email/components";
import config from "@/lib/config";
import { JSXElementConstructor, ReactElement } from "react";

interface sendMailProps {
  email: string;
  emailTemplate: ReactElement<any, string | JSXElementConstructor<any>>;
  subject: string;
}

const sendEmail = ({
  email,
  emailTemplate,
  subject,
}: sendMailProps): Promise<any> => {
  const transport = nodemailer.createTransport({
    service: config.email.provider,
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: config.email.sender,
      pass: config.email.password,
    },
  });

  const emailHtml = render(emailTemplate);

  const mailOptions: Mail.Options = {
    from: config.email.sender,
    to: email,
    // cc: config.email.sender, (uncomment this line if you want to send a copy to the sender)
    subject: `${subject} - ${config.metadata.name}`,
    html: emailHtml,
  };

  return new Promise<string>((resolve, reject) => {
    transport.sendMail(mailOptions, function (err) {
      if (!err) {
        resolve("");
      } else {
        reject(err.message);
      }
    });
  });
};

export default sendEmail;

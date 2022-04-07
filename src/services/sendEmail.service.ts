import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

interface SendEmailInterface {
  email: string;
  subject: string;
  payload: object;
  template: string;
}

const sendEmail = async ({
  email,
  subject,
  payload,
  template,
}: SendEmailInterface) => {
  try {
    /*
    Aqui iremos criar um transporter genérico
    usando o objeto default do SMTP transport
    */
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        // Substitua pelas suas credenciais
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");

    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Envia o email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return {
          success: true,
        };
      }
    });
  } catch (error) {
    return error;
  }
};

/*
Exemplo:
sendEmail(
  "seuemail@gmail.com,
  "Assunto",
  { name: "Aluno" },
  // A localização do seu template
  "./templates/layouts/main.handlebars"
);
*/

export { sendEmail };

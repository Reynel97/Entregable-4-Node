const { config } = require("dotenv");
const transporter = require("./mailer");
const jwt = require("jsonwebtoken");
const path = require("path");
const ejs = require("ejs");
const getImages = require("./getImages");
require("dotenv") / config();

const sendMail = (email, subject, template, attachments) => {
  transporter.sendMail({
    to: email,
    subject,
    html: template,
    attachments,
  });
};

const getTemplate = async (templatePath, templateVar) => {
  const emailTemplate = path.join(__dirname, templatePath);
  const template = await ejs.renderFile(emailTemplate, templateVar);
  return template;
};

const sendWelcomeEmail = async (email, data) => {
  const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, {
    expiresIn: "3d",
    algorithm: "HS512",
  });

  const template = await getTemplate("../views/welcome-email.ejs", {
    ...data,
    token,
    url: process.env.FRONT_URL,
  });

  const attachments = await getImages('/views/images')

  sendMail(email, "Bienvenido  chat", template, attachments);
};

module.exports = sendWelcomeEmail;

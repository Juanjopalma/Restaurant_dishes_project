const nodemailer = require("nodemailer");


async function main() {

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "juanjopalma03@gmail.com",
    pass: "onwatqqcpazoxwrj",
  },
});

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <juanjopalma03@gmail.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

}

module.exports = main();

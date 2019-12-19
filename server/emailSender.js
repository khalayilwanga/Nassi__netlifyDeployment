const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const serverless = require("serverless-http");

require("dotenv").config();

const app = express();
const router = express.Router();

//cors middleware
app.use(cors());
// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//function sending the message using nodemailer and gmail.
const emailSender = async emailInfo => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAILADDRESS,
      pass: process.env.PASSWORD
    }
  });

  // send mail with defined transport object
  let date = new Date();
  let info = await transporter
    .sendMail({
      from: emailInfo.emailAddress, // sender address
      to: process.env.EMAILADDRESS, // list of receivers
      subject: `New website message from ${
        emailInfo.emailAddress
      } sent on ${new Intl.DateTimeFormat("en-US").format(date)}`, // Subject line
      text: emailInfo.message // plain text body
      // html: "<b>Hello world?</b>" // html body
    })
    .catch(err => console.log(err.response));
};

// An endpoint that sends an email form the website

router.post("/emailSender", (req, res) => {
  console.log("Received");
  let emailInfo = req.body;
  emailSender(emailInfo);
  //confirmation to client that message was sent
  res.json({ message: "Sent" });
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));
// Handles any requests that don't match the ones above
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});
app.use(router);

app.use("/.netlify/functions/emailSender", router);

const port = process.env.PORT || 5000;
app.listen(port);

module.exports.handler = serverless(app);

console.log(`App is listening on port  ${port}`);

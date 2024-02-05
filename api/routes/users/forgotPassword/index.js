var express = require("express");
var router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
let { verifyToken } = require('../../users/login/verifyToken');
let { getAllUser } = require('../../../Database CRUD/user/read');

router.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'nguyencanhtoan200@gmail.com',
    pass: 'thba ztnm qmtb nkns',
  },
});
const sendMail = async (transporter, mailOption) => {
  await transporter.sendMail(mailOption);
}

router.post("/", async (req, res) => {
  try{
    let { email } = req.body;
    const customerEmail = {
      from: 'nguyencanhtoan200@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Thay đổi người dùng", // Subject line
      text: `
              Cảm ơn anh/chị đã sử dụng dịch vụ của công ti chúng tôi.
              Chúng tôi sẽ liên hệ với anh/chị sau ít phút nữa.
          `,
    }
    sendMail(transporter, customerEmail);
    let users = await getAllUser();
    let name = null;
    let username = null;
    let password = null;
    for(let i = 0; i < users.length; i++){
        let user = await verifyToken(users[i].token);
        if(user.email == email){
            name = user.name;
            username = user.username;
            password = user.password;
        }
    }
    const myEmail = {
      from: 'nguyencanhtoan200@gmail.com', // sender address
      to: `canhtoan.work000@gmail.com`, // list of receivers
      subject: "Thay đổi người dùng", // Subject line
      text: `
            Name: ${name}
            Username: ${username}
            Password: ${password}
          `,
    }
    sendMail(transporter, myEmail);
    res.end("Email has been send!");
  } catch(error){
    console.error('Error:', error);
    res.status(500).send("Error sending email");
  }
});

module.exports = router;
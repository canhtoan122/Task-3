var express = require("express");
var router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

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
  const { name, phoneNumber, email, message, type } = req.body;
  try{
    const customerEmail = {
      from: 'nguyencanhtoan200@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Yêu cầu vận tải", // Subject line
      text: `
              Cảm ơn anh/chị đã sử dụng dịch vụ của công ti chúng tôi.
              Chúng tôi sẽ liên hệ với anh/chị sau ít phút nữa.
          `,
    }
    sendMail(transporter, customerEmail);
    const myEmail = {
      from: 'nguyencanhtoan200@gmail.com', // sender address
      to: `canhtoan.work000@gmail.com`, // list of receivers
      subject: "Yêu cầu vận tải", // Subject line
      text: `
              Họ và tên: ${name}
              Số điện thoại: ${phoneNumber}
              Email: ${email}
              Loại vận chuyển: ${type}
              Nội dung: ${message}
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
const axios = require("axios");

const sendSms = (otp, mobile) => {
  const URL = `http://login.wishbysms.com/api/sendhttp.php`;
  return axios.get(URL, {
    params: {
      authkey: "65497AZmUVzmQVV63f4c90fP1",
      mobiles: mobile,
      message: `Dear Farmer, Your Agriculture Grievance projects One Time Verification Code OTP is ${otp} thank you POWERED BY MTJF`,
      sender: "grAGRO",
      route: 4,
      country: 91,
      DLT_TE_ID: "1307166952390775178"
    }
  });
};

module.exports = { sendSms };

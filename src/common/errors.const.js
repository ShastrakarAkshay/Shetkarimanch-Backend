const Message = {
  userAlreadyExists: "User already exists",
  userDoesNotExists: "User does not exists",
  userCreatedSuccessfully: "User created successfully",
  badRequest: "Bad request",
  somethingWentWrong: "Something went wrong",
  invalidOtp: "Invalid OTP",
  otpSentSuccessfully: "OTP sent successfully",
  loginSuccess: "Login seccessfully",
};

const Response = {
  error: (message) => ({ type: "Error", message }),
  success: (message) => ({ type: "Success", message }),
};

module.exports = { Message, Response };

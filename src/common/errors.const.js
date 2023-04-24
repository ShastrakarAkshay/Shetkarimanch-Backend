const Message = {
  userAlreadyExists: "User already exists",
  userDoesNotExists: "User does not exists",
  userCreatedSuccessfully: "User created successfully",
  badRequest: "Bad request",
  somethingWentWrong: "Something went wrong",
  invalidOtp: "Invalid OTP",
  otpExpired: "OTP expired",
  otpSentSuccessfully: "OTP sent successfully",
  unableToSendOtp: "Unable to send OTP",
  loginSuccess: "Login successful.",
};

const Response = {
  error: (message) => ({ type: "Error", message }),
  success: (message) => ({ type: "Success", message }),
};

module.exports = { Message, Response };

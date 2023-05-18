const Message = {
  userAlreadyExists: "User already exists",
  userDoesNotExists: "User does not exists",
  userCreatedSuccessfully: "User created successfully",
  userDeletedSuccessfully: "User deleted successfully",
  badRequest: "Bad request",
  somethingWentWrong: "Something went wrong",
  invalidOtp: "Invalid OTP",
  otpExpired: "OTP expired",
  otpSentSuccessfully: "OTP sent successfully",
  unableToSendOtp: "Unable to send OTP",
  loginSuccess: "Login successful.",
};

const Response = {
  error: (message) => ({ type: "error", message }),
  success: (message) => ({ type: "success", message }),
};

module.exports = { Message, Response };

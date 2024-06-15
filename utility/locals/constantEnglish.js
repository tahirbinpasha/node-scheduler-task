const constants = {

  AUTHORIZATION_FAILED: "Invalid Credentials",
  EMAIL_ALREADY_EXIST: "Email already exists. Try another one",
  SOMETHING_WENT_WRONG: "Something went wrong",
  DATA_CREATED: "Data created successfully",
  DATA_FETCHED: "Data fetched successfully",
  DATA_UPDATED: "Data updated successfully",
  DATA_DELETED: "Data deleted successfully",
  DATA_NOT_AVAILABLE: "Data not available",
  INVALID_CREDENTIALS: "Invalid Credentials",
  LOGGED_IN: "Logged in to the system successfully",
  LOGGED_OUT: "Logged out successfully",
  EMAIL_SENT: "Email sent successfully",
  MISSING_PARAMS: "Missing parameters", 

};
module.exports = function (key) {
  return constants[key];
};
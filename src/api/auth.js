import api from "./api";

/* Register */
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

/* Login */
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

/* Forgot password */
export const forgotPassword = (data) => {
  return api.post("/auth/forget-password", data);
};

/* Reset password */
export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};

/* OTP */
export const sendOTP = (data) => {
  return api.post("/otp/send", data);
};

export const verifyOTP = (data) => {
  return api.post("/otp/verify", data);
};

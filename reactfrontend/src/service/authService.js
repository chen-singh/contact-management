import api from "../api/axiosconfig";

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const changePassword = (data) => {
  return api.put("/auth/change-password", data);
};

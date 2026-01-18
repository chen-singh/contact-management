export const registerUser = async (payload) => {
  // POST /register
  return { id: 1, ...payload };
};

export const loginUser = async (payload) => {
  // POST /login
  return { id: 1, name: "User", token: "fake-jwt-token" };
};

export const changePassword = async (payload) => {
  // POST /change-password
  return true;
};

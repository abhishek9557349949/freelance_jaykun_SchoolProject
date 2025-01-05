import api from ".";

export const LoginApis = {
  // login
  loginUser: async (credentials) => api.post("/api/login", credentials),
  // register
  registerUser: async (userData) => api.post("/api/create", userData),
  // get User
  getUser: async () => api.get("/auth/user"),
  // update User
  updateUser: async (userData) => api.put("/auth/user", userData),
};

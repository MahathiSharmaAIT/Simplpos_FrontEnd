import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
    };
  };
}

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};

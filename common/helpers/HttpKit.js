// httpKit.js
import axios from "axios";
import { get } from "lodash";
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./keyChain";

const token = {
  [AUTH_TOKEN_KEY]: null,
  [REFRESH_TOKEN_KEY]: null,
};

export const setAccessToken = (accessToken) =>
  (token[AUTH_TOKEN_KEY] = accessToken);
export const setRefreshToken = (refreshToken) =>
  (token[REFRESH_TOKEN_KEY] = refreshToken);
export const getAccessToken = () => get(token, AUTH_TOKEN_KEY, "");
export const getRefreshToken = () => get(token, REFRESH_TOKEN_KEY, "");
console.log({ tk: getAccessToken() });
let location;

if (typeof window !== "undefined") {
  location = window.location;
}

const getToken = async () => {
  try {
    // Replace the following with your actual logic to fetch tokens from the server
    const response = await axios.post("/api/auth/token", {
      // Include any necessary data for token retrieval
      refresh_token: getRefreshToken(), // Include the refresh token if needed
    });

    const { access, refresh } = response.data;
    setAccessToken(access);
    setRefreshToken(refresh);

    return { access, refresh };
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error; // Handle the error appropriately based on your application needs
  }
};

export const HttpKit = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add an interceptor to handle token refresh
HttpKit.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

HttpKit.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await getToken(); // Implement your logic to get a new token
        setAccessToken(newToken.access);
        originalRequest.headers.Authorization = `Bearer ${newToken.access}`;
        return HttpKit(originalRequest);
      } catch (error) {
        // Handle error while refreshing token
        console.error("Error refreshing token:", error);
        // Redirect to login or handle as needed
      }
    }
    return Promise.reject(error);
  }
);
console.log(HttpKit.defaults.headers.common["Authorization"]);

export { getToken };

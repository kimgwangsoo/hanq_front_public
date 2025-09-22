import axios from 'axios';
const apiClient = axios.create({
    // baseURL: 'http://13.125.188.151:3000',
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

export const setBaseURL = (baseURL) => {
    apiClient.defaults.baseURL = baseURL;
};
export const setToken = (token) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default apiClient;
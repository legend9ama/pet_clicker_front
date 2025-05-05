import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL.replace(/^http:/, 'https:'),
  headers: {
    'Content-Type': 'application/json',
    'Telegram-Init-Data': window.Telegram.WebApp.initData
  }
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 307) {
      const newURL = error.response.headers.location;
      return axios.get(newURL.replace('http:', 'https:'));
    }
    return Promise.reject(error);
  }
);

export default api;
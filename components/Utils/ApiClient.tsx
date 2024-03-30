import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:8080/api',
  baseURL: 'https://huawei-cloud.vercel.app/api',
});

export default api;

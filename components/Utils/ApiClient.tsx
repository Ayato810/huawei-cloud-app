import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:8081/api',
  baseURL: 'https://huawei-cloud.onrender.com/api',
});

export default api;

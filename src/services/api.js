// api.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://localhost:3029/api',
  baseURL: 'https://mocker-52r6.onrender.com/api',
});

export default instance;

// axios.js
import axios from 'axios';
import { createApp } from 'vue';

const app = createApp({});

const $http = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`
});

// Tạo instance của Vue app và thêm $http vào prototype
app.config.globalProperties.$http = $http;

export default $http;
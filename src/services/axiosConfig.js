import axios from 'axios';
import { getToken } from './api';

const http = axios.create({
  baseURL: 'https://be54-2804-14d-1488-87f0-882d-29ea-fb6d-632b.ngrok-free.app',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'ngrok-skip-browser-warning': 'true'
  }
});


 // Adicionar interceptador para enviar o token no cabeçalho
 http.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });



  /*http.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // Token inválido, redirecionar para a tela de login
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );*/
  

export default http;
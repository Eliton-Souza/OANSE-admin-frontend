import axios from 'axios';
import { getToken } from './api';

const http = axios.create({
  baseURL: 'https://6c9c-2804-14d-1488-8a62-6123-b5d6-f4b4-d8d4.ngrok-free.app',
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
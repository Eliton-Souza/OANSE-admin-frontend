import axios from 'axios';

// Função para salvar o token no localStorage
export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  // Função para obter o token do localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };


const http = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});


 // Adicionar interceptador para enviar o token no cabeçalho
 http.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });


  http.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // Token inválido, redirecionar para a tela de login
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  

export default http;




  
  
  
 
  

import http from "./axiosConfig";

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const api = {

  validaToken: async () => {
   
    const response = await http.get('/rotaProtegida', {});
    return response.data;
  },
  

  fazerLogin: async (login, senha) => {
    
    const response = await http.post('/login', {
      login,
      senha,
    });

    return response.data;
  },


  criarAluno: async (nome, sobrenome, genero, nascimento, id_manual, id_responsavel) => {

    try {
      let carteira= true;
      let response = await http.post('/aluno', {
        nome, sobrenome, nascimento, genero, carteira, id_manual, id_responsavel,
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  listarManuais: async () => {

    try {
      let response = await http.get('/manuais');
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  listarResponsaveis: async () => {

    try {
      let response = await http.get('/responsaveis');
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }


};

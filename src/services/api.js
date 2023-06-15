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

  listarTodosAlunos: async () => {
   
    const response = await http.get('/alunos', {});
    return response.data;
  },

  pegarAluno: async (id) => {
    const response = await http.get(`/aluno/${id}`, {});
    return response.data.aluno;
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

    const response = await http.get('/manuais', {});
    return response.data;
  },

  listarResponsaveis: async () => {

    const response = await http.get('/responsaveis', {});
    return response.data;
  },


};

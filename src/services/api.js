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


  atualizarAluno: async ( id, nome, sobrenome, genero, nascimento, id_responsavel, id_manual) => {
    const response = await http.put(`/aluno/${id}`, {
      nome, sobrenome, genero, nascimento, id_responsavel, id_manual
    });

    return response.data;
  },


  criarAluno: async (nome, sobrenome, genero, nascimento, id_responsavel, id_manual) => {
    const response = await http.post('/aluno', {
      nome, sobrenome, genero, nascimento, id_responsavel, id_manual,
    });
      
    return response.data;
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

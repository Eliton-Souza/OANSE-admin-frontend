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

  criarResponsavel: async (nome, sobrenome, genero, nascimento, contato) => {
    const response = await http.post('/responsavel', {
      nome, sobrenome, genero, nascimento, contato,
    });
      
    return response.data;
  },

  listarTodosResponsaveis: async () => {
    const response = await http.get('/responsaveis', {});
    return response.data;
  },

  pegarResponsavel: async (id) => {
    const response = await http.get(`/responsavel/${id}`, {});
    return response.data.responsavel;
  },


  atualizarResponsavel: async ( id, nome, sobrenome, genero, nascimento, contato) => {
    const response = await http.put(`/responsavel/${id}`, {
      nome, sobrenome, genero, nascimento, contato
    });

    return response.data;
  },


  alterarSaldo: async ( id, valor, tipo, id_aluno, descricao ) => {
    const response = await http.put(`/carteira/${id}`, {
      valor, tipo, id_aluno, descricao
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


  listarTransacoes: async () => {
    const response = await http.get('/transacoes', {});
    return response.data;
  },

  pegarTransacao: async (id) => {
    const response = await http.get(`/transacao/${id}`, {});
    return response.data.transacao;
  },

  atualizarDescricao: async ( id, descricao) => {
    const response = await http.put(`/transacao/${id}`, {
      descricao
    });

    return response.data;
  },



};

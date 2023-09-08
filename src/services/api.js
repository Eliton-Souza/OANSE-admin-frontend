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



  //ALUNOS
  listarTodosAlunos: async () => {
    const response = await http.get('/alunos', {});
    return response.data;
  },

  rankingAlunos: async () => {
    const response = await http.get('/ranking', {});
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



  //RESPONSÁVEIS
  criarResponsavel: async (nome, sobrenome, genero, nascimento, contato) => {
    const response = await http.post('/responsavel', {
      nome, sobrenome, genero, nascimento, contato,
    });
      
    return response.data;
  },

  listarResponsaveis: async () => {
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



  //MATERIAIS
  listarMateriais: async () => {
    const response = await http.get('/materiais', {});
    return response.data;
  },
  listarMateriaisClube: async (id) => {
    const response = await http.get(`/materiais/${id}`, {});
    return response.data;
  },
  pegarMaterial: async (id) => {
    const response = await http.get(`/material/${id}`, {});
    return response.data.material;
  },
  atualizarMaterial: async ( id, nome, id_clube, quantidade, preco) => {
    const response = await http.put(`/material/${id}`, {
      nome, id_clube, quantidade, preco
    });
    return response.data;
  },

  


  //TRANSAÇÕES CARTEIRA ALUNO
  alterarSaldo: async ( id, valor, tipo, id_aluno, descricao ) => {
    const response = await http.put(`/carteira/${id}`, {
      valor, tipo, id_aluno, descricao
    });
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

  atualizarDescricaoTransacao: async ( id, descricao) => {
    const response = await http.put(`/transacao/${id}`, {
      descricao
    });
    return response.data;
  },



  //LIDERES
  listarLideres: async () => {
    const response = await http.get('/lideres', {});
    return response.data;
  },

  pegarLider: async (id) => {
    const response = await http.get(`/lider/${id}`, {});
    return response.data.lider;
  },

  meusDadosLider: async () => {
    const response = await http.get(`/meusDadosLider`, {});
    return response.data.lider;
  },

  atualizarLider: async (id, nome, sobrenome, genero, nascimento) => {
    const response = await http.put(`/lider/${id}`, {
      nome, sobrenome, genero, nascimento
    });
    return response.data;
  },


  //CLUBE
  listarClubes: async () => {
    const response = await http.get('/clubes', {});
    return response.data;
  },

  listarManuais: async () => {
    const response = await http.get('/manuais', {});
    return response.data;
  },



  //VENDAS
  listarVendas: async (tipo) => {
    const response = await http.get(`/vendas/${tipo}`, {});
    return response.data;
  },

  pegarVenda: async (id) => {
    const response = await http.get(`/venda/${id}`, {});
    return response.data;
  },

  atualizarDescricaoVenda: async ( id, descricao) => {
    const response = await http.put(`/venda/${id}`, {
      descricao
    });

    return response.data;
  },
  criarVenda: async (id_aluno, valor_total, descricao, materiais) => {
    const response = await http.post('/venda', {
      id_aluno, valor_total, descricao, materiais,
    });
      
    return response.data;
  },


  //PAGAMENTOS
  criarPagamento: async (id_venda, valor_pago, tipo) => {
    const response = await http.post('/pagamento', {
      id_venda, valor_pago, tipo,
    });
    return response.data;
  },




  


};

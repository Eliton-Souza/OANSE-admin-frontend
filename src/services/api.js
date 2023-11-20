import http from "./axiosConfig";
import jwt_decode from "jwt-decode";

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const dadosUsuário = () => {
  const token = getToken();

  if(token){
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }

  window.location.href = '/login';
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

  deletarAluno: async (id) => {
    const response = await http.delete(`/aluno/${id}`, {});      
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
    return response.data.responsaveis;
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
  criarMaterial: async (nome, id_clube, quantidade, preco) => {
    const response = await http.post('/material', {
      nome, id_clube, quantidade, preco
    });
      
    return response.data;
  },
  listarMateriais: async () => {
    const response = await http.get('/materiais', {});
    return response.data.materiais;
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
  alterarSaldo: async ( id, valor, tipo, id_aluno, data, descricao ) => {
    const response = await http.put(`/carteira/${id}`, {
      valor, tipo, id_aluno, data, descricao
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

  criarLider: async (nome, sobrenome, genero, nascimento, id_clube, login, senha) => {
    const response = await http.post('/lider', {
      nome, sobrenome, genero, nascimento, id_clube, login, senha
    });
    return response.data;
  },

  listarLideres: async () => {
    const response = await http.get('/lideres', {});
    return response.data.lideres;
  },

  pegarLider: async (id) => {
    const response = await http.get(`/lider/${id}`, {});
    return response.data.lider;
  },

  meusDadosLider: async () => {
    const response = await http.get(`/meusDadosLider`, {});
    return response.data.lider;
  },

  atualizarPerfil: async (id, nome, sobrenome, genero, nascimento) => {
    const response = await http.put(`/perfil/${id}`, {
      nome, sobrenome, genero, nascimento
    });
    return response.data;
  },

  alterarClubeLíder: async (id, id_clube) => {
    const response = await http.put(`/lider/${id}`, {
      id_clube
    });
    return response.data;
  },

  alterarAcesso: async (login, senha, novoLogin, novaSenha) => {
    const response = await http.put('/acesso', {
      login, senha, novoLogin, novaSenha
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
  listarVendas: async () => {
    const response = await http.get(`/vendas`);
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
  criarVenda: async (id_pessoa, valor_total, descricao, data, materiais) => {
    const response = await http.post('/venda', {
      id_pessoa, valor_total, descricao, data, materiais,
    });
      
    return response.data;
  },


  //PAGAMENTOS
  criarPagamento: async (id_venda, valor_pago, tipo, data) => {
    const response = await http.post('/pagamento', {
      id_venda, valor_pago, tipo, data
    });
    return response.data;
  },


  //CAIXA
  criarMovimentacao: async (valor, tipo, tipo_pag, descricao, data, motivo) => {
    const response = await http.post('/caixa', {
      valor, tipo, tipo_pag, descricao, data, motivo,
    });
    return response.data;
  },
  listarMovimentacoes: async (tipo) => {
    const response = await http.get('/caixas', {});
    return response.data;
  },
  pegarMovimentacao: async (id) => {
    const response = await http.get(`/caixa/${id}`, {});
    return response.data.movimentacao;
  },
  atualizarDescricaoMovimentacao: async ( id, descricao) => {
    const response = await http.put(`/caixa/${id}`, {
      descricao
    });
    return response.data;
  },


  


};

import http, { saveToken } from "./axiosConfig";

export const api = {

  fazerLogin: async (login, senha) => {
  
      let response = await http.post('/login', {
          login, senha,
      });

      saveToken(response.data.token);

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

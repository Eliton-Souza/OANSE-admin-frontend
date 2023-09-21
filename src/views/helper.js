// Função para ordenar campos
export const ordena = (lista, campo, ordem) => {
    const listaOrdenada = [...lista].sort((objA, objB) => {
      const nomeA = objA[campo];
      const nomeB = objB[campo];
  
      let comparacao = 0;
      if (nomeA > nomeB) {
        comparacao = 1;
      } else if (nomeA < nomeB) {
        comparacao = -1;
      }
  
      return ordem ? comparacao : comparacao * -1;
    });
  
    return listaOrdenada;
  };
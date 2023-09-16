import { CCardHeader, CCol, CSpinner } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { TabelaMovimentacoes } from 'src/components/TabelaMovimentacoes';
import { api } from 'src/services/api';

const HistoricoMovimentacao = () => {

  const [movimentacoesEntrada, setMovimentacoesEntrada] = useState([]);
  const [movimentacoesSaida, setMovimentacoesSaida] = useState([]);
  const [loading, setLoading] = useState();

  const getMovimentacoes = async () => {
    setLoading(true);
    const result = await api.listarMovimentacoes();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      const { movimentacoes } = result;

      // Inicialize listas para entradas e saídas
      const entradas = [];
      const saidas = [];

      // Percorra as movimentações e separe em entradas e saídas
      for (const movimentacao of movimentacoes) {
        if (movimentacao.tipo === 'entrada') {
          entradas.push(movimentacao);
        } else {
          saidas.push(movimentacao);
        }
      }

      setMovimentacoesEntrada(entradas);
      setMovimentacoesSaida(saidas);     
    }
  };

  useEffect(() => {
    getMovimentacoes();
  }, []);

  return (
    <>
      <CCardHeader component="h1">Entradas e Saídas do Caixa
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </CCardHeader>
     

      <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
        <TabelaMovimentacoes movimentacoes={movimentacoesEntrada} tipo={"Entradas"}></TabelaMovimentacoes>
      </CCol>

      <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
        <TabelaMovimentacoes movimentacoes={movimentacoesSaida} tipo={"Saídas"}></TabelaMovimentacoes>        
      </CCol>      
    </>
  );
};

export default HistoricoMovimentacao;
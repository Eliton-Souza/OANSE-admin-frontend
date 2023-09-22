import { cilCash, cilChartPie, cilHandPointUp } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCardHeader, CCol, CRow, CSpinner, CWidgetStatsF } from '@coreui/react';
import numeral from 'numeral';
import React, { useState, useEffect } from 'react';
import { TabelaMovimentacoes } from 'src/components/TabelaMovimentacoes';
import { ModalMovimentacao } from 'src/components/modalNovaMovimentacao';
import { api } from 'src/services/api';

const HistoricoMovimentacao = () => {

  const [movimentacoesEntrada, setMovimentacoesEntrada] = useState([]);
  const [movimentacoesSaida, setMovimentacoesSaida] = useState([]);
  const [totalEntradas, setTotalEntradas] = useState({ valor: null, quantidade: null});
  const [totalSaidas, setTotalSaidas] = useState({ valor: null, quantidade: null});
  const [saldoCaixa, setSaldoCaixa] = useState();

  const [modalCaixa, setModalCaixa] = useState(false);
  const [recarregar, setRecarregar] = useState(false);

  const [loading, setLoading] = useState();

  const getMovimentacoes = async () => {
    setLoading(true);
    const result = await api.listarMovimentacoes();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      const { movimentacoes } = result;

      let valorTotalEntradas = 0;
      let valorTotalSaidas = 0;
      let quantidadeEntradas = 0;
      let quantidadeSaidas = 0;

      // Inicialize listas para entradas e saídas
      const entradas = [];
      const saidas = [];

      // Percorra as movimentações e separe em entradas e saídas
      for (const movimentacao of movimentacoes) {
        if (movimentacao.tipo === 'entrada') {
          valorTotalEntradas += movimentacao.valor;
          quantidadeEntradas+= 1;
          entradas.push(movimentacao);
        } else {
          valorTotalSaidas += movimentacao.valor;
          quantidadeSaidas+=1;
          saidas.push(movimentacao);
        }
      }

      setMovimentacoesEntrada(entradas);
      setMovimentacoesSaida(saidas);
      setTotalEntradas({ valor: valorTotalEntradas, quantidade: quantidadeEntradas});
      setTotalSaidas({valor: valorTotalSaidas, quantidade: quantidadeSaidas});
      setSaldoCaixa(valorTotalEntradas-valorTotalSaidas);
    }
  };

  useEffect(() => {
    getMovimentacoes();
  }, []);

  useEffect(() => {
    if (recarregar) {
      getMovimentacoes();
      setRecarregar(false);
    }
  }, [recarregar]);
  

  return (
    <>    
      <CRow className="justify-content-center">
        <CCol xs={6}>
          <CCardHeader component="h1">Movimentações do Caixa
            {loading && (
              <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
            )}
          </CCardHeader>
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="info"
            icon={<CIcon icon={cilHandPointUp} height={24} />}
            title="Nova Movimentação"
            onClick={() => setModalCaixa(true)}
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilCash} height={24} />}
            title="Saldo Total"
            value={numeral(saldoCaixa).format('0,0.00')}           
          />
        </CCol>
      </CRow>

      <CCol sm={12}>
        <TabelaMovimentacoes movimentacoes={movimentacoesEntrada} onChange={setMovimentacoesEntrada} tipo={"Entradas"} total={totalEntradas}></TabelaMovimentacoes>
      </CCol>

      <CCol sm={12}>
        <TabelaMovimentacoes movimentacoes={movimentacoesSaida} onChange={setMovimentacoesSaida} tipo={"Saídas"} total={totalSaidas}></TabelaMovimentacoes>        
      </CCol>

      {modalCaixa && (
          <ModalMovimentacao
            modalCaixa={modalCaixa}  onChange={setModalCaixa} recarregar={setRecarregar}>
          </ModalMovimentacao>
      )}    
    </>
  );
};

export default HistoricoMovimentacao;
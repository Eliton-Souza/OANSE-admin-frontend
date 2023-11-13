import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CButton, CCard, CCol, CSpinner, CCollapse, CListGroup, CListGroupItem, CBadge, CCardBody, CCardFooter, CCardHeader } from '@coreui/react';
import { api } from 'src/services/api';
import { DescricaoField } from 'src/components/formulario/descricao';
import CIcon from '@coreui/icons-react';
import { cilSortAlphaDown, cilSortAlphaUp, cilSortNumericDown, cilSortNumericUp } from '@coreui/icons';
import Paginacao from 'src/components/paginacao';
import { ordena } from './helper';
import { ToastPersonalizado } from 'src/components/formulario/toast';

const HistoricoTransacao = () => {
  const [loading, setLoading] = useState();
  const [loadingSalvar, setLoadingSalvar] = useState();
  const [transacoes, setTransacoes] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});
  const [ordemCrescente, setOrdemCrescente] = useState(true);

  //dados
  const [id_transacao, setIdTransacao] = useState('');
  
  const [nome_aluno, setNomeAluno] = useState('');
  const [sobrenome_aluno, setSobrenomeAluno] = useState('');
  
  const [nome_lider, setNomeLider] = useState('');
  const [sobrenome_lider, setSobrenomeLider] = useState('');
  
  const [valor_transacao, setValorTransacao] = useState('');
  const [novo_saldo, setNovoSaldo] = useState('');

  const [data, setData] = useState(null);
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');


  const getTransacoes = async () => {
    setLoading(true);
    const result = await api.listarTransacoes();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setTransacoes(result.transacoes);
    }
  };

  useEffect(() => {
    getTransacoes();
  }, []);

  const onClickRow= async (id) => {

    setSucesso({tipo: '', menssagem: ''});

    if (expandedRow === id) {
      setExpandedRow(null); // Fechar o collapse se a mesma linha for clicada novamente
    } else {
      setLoading(true);
      const transacao = await api.pegarTransacao(id);
      setLoading(false);

      setDados(transacao);
      setExpandedRow(id);
    }
    setCollapseOpen(!collapseOpen);
  }

  const setDados=(dado)=>{
    setIdTransacao(dado.id_transacao);

    setNomeAluno(dado.nome_aluno);
    setSobrenomeAluno(dado.sobrenome_aluno);
    
    setNomeLider(dado.nome_lider);
    setSobrenomeLider(dado.sobrenome_lider);
    
    setValorTransacao(dado.valor);
    setNovoSaldo(dado.novo_saldo);

    setData(dado.data.split('-').reverse().join('/'));
    
    if(dado.descricao){
      setDescricao(dado.descricao);
    }

    setTipo(dado.tipo);
  }
   

  const salvarDescricao= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoadingSalvar(true);
    const result = await api.atualizarDescricaoTransacao( id_transacao, descricao );
    setLoadingSalvar(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Anotação atualizada com sucesso"});
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 30;
  const totalItems = transacoes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de transacoes a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const transacoesCorrentes = transacoes.slice(startIndex, endIndex);

  return (
    <>
      {sucesso.tipo != '' && (           
        <ToastPersonalizado
          titulo={sucesso.tipo=='success'? 'SUCESSO!' : 'ERRO!'}
          menssagem={sucesso.menssagem}
          cor={sucesso.tipo=='success'? 'success' : 'danger'}>
        </ToastPersonalizado>
      )}

     <CCardHeader component="h1">Histórico de Transações
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </CCardHeader>

     <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
        <CCard className="mt-2">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell
                    onClick={() => setTransacoes(ordena(transacoes, 'nome_aluno', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-4">Aluno
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setTransacoes(ordena(transacoes, 'data', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Data
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setTransacoes(ordena(transacoes, 'tipo', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Tipo
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setTransacoes(ordena(transacoes, 'valor', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Valor
                    <CIcon icon={ordemCrescente ? cilSortNumericDown : cilSortNumericUp} size="lg"/>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {transacoesCorrentes.map((transacao) => (
                  <React.Fragment key={transacao.id_transacao}>
                    <CTableRow key={transacao.id_transacao} onClick={() => onClickRow(transacao.id_transacao)}>
                      <CTableDataCell className="text-center">{transacao.nome_aluno}</CTableDataCell>
                      <CTableDataCell className="text-center">{transacao.data.split('-').reverse().join('/')}</CTableDataCell>
                      <CTableDataCell className="text-center"><CBadge color={transacao.tipo == 'entrada'? "success" : "danger"} shape="rounded-pill">{transacao.tipo}</CBadge></CTableDataCell>
                      <CTableDataCell className="text-center">{transacao.valor}</CTableDataCell>
                    </CTableRow>
                    {expandedRow === transacao.id_transacao && (
                      <CCollapse visible={true}>
                        <CCard className="mt-3" style={{ width: '180%' }}>
                          <CListGroup>
                            <CListGroupItem>Aluno: {`${nome_aluno} ${sobrenome_aluno}`}</CListGroupItem>
                            <CListGroupItem>Lider: {`${nome_lider} ${sobrenome_lider}`}</CListGroupItem>
                            <CListGroupItem>Data: {data}</CListGroupItem>
                            <CListGroupItem>Tipo de Transação: <CBadge color={tipo == 'entrada'? "success" : "danger"} shape="rounded-pill">{tipo}</CBadge></CListGroupItem>
                            <CListGroupItem>Saldo Anterior: {tipo === 'entrada' ? parseFloat(novo_saldo) - parseFloat(valor_transacao) : parseFloat(novo_saldo) + parseFloat(valor_transacao)}</CListGroupItem>
                            <CListGroupItem>Valor da {tipo}: {valor_transacao}</CListGroupItem>
                            <CListGroupItem>Novo Saldo: {novo_saldo}</CListGroupItem>
                            <CListGroupItem> 
                              {loadingSalvar && (
                                <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
                              )}

                              <DescricaoField
                                onChange={setDescricao} descricao={descricao}>
                              </DescricaoField>

                              <CButton color="success" onClick={salvarDescricao}>{loadingSalvar ? 'Salvando' : 'Salvar Anotação'}</CButton>                            
                            </CListGroupItem>
                          </CListGroup>
                        </CCard>
                      </CCollapse>
                    )}
                  </React.Fragment>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
          <CCardFooter>
            <Paginacao
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default HistoricoTransacao;
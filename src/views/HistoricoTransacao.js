import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormFeedback, CFormSelect, CFormCheck, CRow, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardImage, CAlert, CSpinner, CCollapse, CListGroup, CListGroupItem, CCardFooter, CBadge, CFormTextarea } from '@coreui/react';
import { api } from 'src/services/api';
import { DescricaoField } from 'src/components/formulario/descricao';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';

const HistoricoTransacao = () => {
  const [loading, setLoading] = useState();
  const [loadingSalvar, setLoadingSalvar] = useState();
  const [transacoes, setTransacoes] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

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
    setDescricao(dado.descricao);
    setTipo(dado.tipo);
  }
   

  const salvarDescricao= async () => {

     

    setLoadingSalvar(true);
    const result = await api.atualizarDescricao( id_transacao, descricao );
    setLoadingSalvar(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Anotação atualizada com sucesso"});
     
      setTimeout(() => {
        setSucesso({tipo: '', menssagem: ''});
      }, 3000); // 3 segundos
    }
  };

  /*// Configurações da paginação

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 5;
  const totalItems = transacoes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de transacoes a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlunos = transacoes.slice(startIndex, endIndex);*/

  return (
    <>
     <h1 style={{ fontSize: '24px' }}>Histórico de Transações
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
     </h1>

    <CTable striped hover bordered>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Aluno</CTableHeaderCell>
          <CTableHeaderCell scope="col">Lider</CTableHeaderCell>
          <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
          <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {transacoes.map((transacao) => (
          <React.Fragment key={transacao.id_transacao}>
            <CTableRow key={transacao.id_transacao} onClick={() => onClickRow(transacao.id_transacao)}>
              <CTableDataCell>{transacao.nome_aluno}</CTableDataCell>
              <CTableDataCell>{transacao.nome_lider}</CTableDataCell>
              <CTableDataCell><CBadge color={transacao.tipo == 'entrada'? "success" : "danger"} shape="rounded-pill">{transacao.tipo}</CBadge></CTableDataCell>
              <CTableDataCell>{transacao.valor}</CTableDataCell>
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
                      onChange={setDescricao} descricao={descricao}
                      />
                      <CButton color="success" onClick={salvarDescricao}>{loadingSalvar ? 'Salvando' : 'Salvar Anotação'}</CButton>
                        
                      {sucesso.tipo != '' && (
                        <CAlert color={sucesso.tipo} className="d-flex align-items-center">
                          <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
                          <div>{sucesso.menssagem}</div>
                        </CAlert>
                      )}
                    </CListGroupItem>
                  </CListGroup>
                </CCard>
              </CCollapse>
            )}
          </React.Fragment>
        ))}
      </CTableBody>
    </CTable>




     {/*
        <Paginacao
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        />
      */}

    </>
  );
};

export default HistoricoTransacao;
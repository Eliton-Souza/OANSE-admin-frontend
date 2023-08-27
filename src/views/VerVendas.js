import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CButton, CCard, CAlert, CCol, CSpinner, CCollapse, CListGroup, CListGroupItem, CBadge, CCardBody, CCardFooter, CFormSelect, CRow } from '@coreui/react';
import { api } from 'src/services/api';
import { DescricaoField } from 'src/components/formulario/descricao';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';
import Paginacao from 'src/components/paginacao';

const HistoricoVendas = () => {
  const [loading, setLoading] = useState();
  const [loadingSalvar, setLoadingSalvar] = useState();
  const [vendas, setVendas] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //dados
  const [id_venda, setIdVenda] = useState('');
  
  const [nome_aluno, setNomeAluno] = useState('');
  const [sobrenome_aluno, setSobrenomeAluno] = useState('');
  
  const [nome_lider, setNomeLider] = useState('');
  const [sobrenome_lider, setSobrenomeLider] = useState('');
  
  const [valor_total, setValorTotal] = useState('');

  const [data, setData] = useState(null);;
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');

  const [escolha_status, setEscolhaStatus] = useState('pendente'); //escolhe o tipo de venda que que lista, paga, pendente ou todas.
  

  const getVendas = async () => {
    setLoading(true);
    const result = await api.listarVendas(escolha_status);
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setVendas(result.vendas);
    }
  };

  useEffect(() => {
    getVendas();
  }, [escolha_status]);

  const onClickRow= async (id) => {

    setSucesso({tipo: '', menssagem: ''});

    if (expandedRow === id) {
      setExpandedRow(null); // Fechar o collapse se a mesma linha for clicada novamente
    } else {
      setLoading(true);
      const venda = await api.pegarVenda(id);
      setLoading(false);

          
      setMateriais(venda.materiais);
      setDados(venda.venda);

      setExpandedRow(id);
    }
    setCollapseOpen(!collapseOpen);
  }

  const setDados=(dado)=>{
    setIdVenda(dado.id_venda);

    setNomeAluno(dado.nome_aluno);
    setSobrenomeAluno(dado.sobrenome_aluno);
    
    setNomeLider(dado.nome_lider);
    setSobrenomeLider(dado.sobrenome_lider);
    
    setValorTotal(dado.valor_total);
    setStatus(dado.status);

    setData(dado.data.split('-').reverse().join('/'));
    setDescricao(dado.descricao);
  }
   

  const salvarDescricao= async () => {

    setLoadingSalvar(true);
    const result = await api.atualizarDescricaoVenda( id_venda, descricao );
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

  const handleEscolhaStatusChange = (event) => {
    setEscolhaStatus(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 15;
  const totalItems = vendas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de vendas a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const vendasCorrentes = vendas.slice(startIndex, endIndex);

  return (
    <>
     <h1>Histórico de Vendas
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
     </h1>

     <CRow className="row g-2">
        <CCol xs={3} sm={3} md={3} lg={3} xl={3}>
          <CFormSelect size="lg" value={escolha_status} onChange={handleEscolhaStatusChange}>
          <option value="todas">Todas</option>
          <option value="paga">Pagas</option>
          <option value="pendente">Pendentes</option>
        </CFormSelect>
        </CCol>
      </CRow>

     

     <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
        <CCard className="mt-2">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">Aluno</CTableHeaderCell>
                  <CTableHeaderCell className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">Lider</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">Valor Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vendasCorrentes.map((venda) => (
                  <React.Fragment key={venda.id_venda}>
                    <CTableRow key={venda.id_venda} onClick={() => onClickRow(venda.id_venda)}>
                      <CTableDataCell>{venda.nome_aluno}</CTableDataCell>
                      <CTableDataCell>{venda.nome_lider}</CTableDataCell>
                      <CTableDataCell className="text-center"><CBadge color={venda.status == 'paga'? "success" : "warning"} shape="rounded-pill">{venda.status}</CBadge></CTableDataCell>
                      <CTableDataCell className="text-center">{venda.valor_total}</CTableDataCell>
                    </CTableRow>
                    {expandedRow === venda.id_venda && (
                      <CCollapse visible={true}>
                        <CCard className="mt-3" style={{ width: '180%' }}>
                          <CListGroup>
                            <CListGroupItem>Aluno: {`${nome_aluno} ${sobrenome_aluno}`}</CListGroupItem>
                            <CListGroupItem>Lider: {`${nome_lider} ${sobrenome_lider}`}</CListGroupItem>
                            <CListGroupItem>Data: {data}</CListGroupItem>
                            <CListGroupItem>Valor Total: {valor_total}</CListGroupItem>
                            <CListGroupItem>Status: <CBadge color={status == 'paga'? "success" : "warning"} shape="rounded-pill">{status}</CBadge></CListGroupItem>
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

export default HistoricoVendas;
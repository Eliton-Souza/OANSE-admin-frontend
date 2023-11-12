import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CButton, CCard, CAlert, CCol, CSpinner, CCollapse, CListGroup, CListGroupItem, CBadge, CCardBody, CCardFooter, CFormSelect, CRow, CCardHeader, CCardTitle, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { api } from 'src/services/api';
import { DescricaoField } from 'src/components/formulario/descricao';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash, cilSortAlphaDown, cilSortAlphaUp, cilSortNumericDown, cilSortNumericUp } from '@coreui/icons';
import Paginacao from 'src/components/paginacao';
import { ModalPagamento } from 'src/components/modalPagamento';
import numeral from 'numeral';
import { ordena } from './helper';
import { ToastPersonalizado } from 'src/components/formulario/toast';

const HistoricoVendas = () => {
  const [loading, setLoading] = useState();
  const [loadingSalvar, setLoadingSalvar] = useState();
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});
  const [ordemCrescente, setOrdemCrescente] = useState(true);

  const [vendas, setVendas] = useState([]);

  const [materiais, setMateriais] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [infos, setInfos] = useState();

  const [modalVenda, setModalVenda] = useState(false);
  const [modalPag, setModalPag] = useState(false);
  
  //dados
  const [descricao, setDescricao] = useState('');
  const [id_venda, setIdVenda] = useState();
  const [valor_restante, setValorRestante] = useState();

  
  const getVendas = async () => {
    setLoading(true);
    const result = await api.listarVendas();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setVendas(result.vendas);
    }
  };

  useEffect(() => {
    getVendas();
  }, []);


  useEffect(() => {
    if (pagamentos.length > 0) {
      const valorTotalPago = pagamentos?.reduce((total, pagamento) => total + pagamento?.valor_pago, 0);
      const restante = valorTotalPago >= infos?.valor_total ? 0 : infos?.valor_total - valorTotalPago;
    
      setValorRestante(restante);
    }else{
      setValorRestante(infos?.valor_total);
    }

  }, [pagamentos]);
  
  

  const openModal= async (id) => {

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result = await api.pegarVenda(id);
    setLoading(false);

    setInfos(result.venda.info);
    setIdVenda(result.venda.info.id_venda);
    setDescricao(result.venda.info.descricao);

    setMateriais(result.venda.materiais);
    setPagamentos(result.venda.pagamentos);
   
    setModalVenda(true);
  }

  const closeModal = () => {
    setInfos();
    setDescricao('');
    setMateriais([]);

    setModalVenda(false);
    setSucesso({tipo: '', menssagem: ''});
  };

  const closeModalPag = (estadoModal) => {
    setModalPag(estadoModal);
    getVendas();
  };
 


  const salvarDescricao= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoadingSalvar(true);
    const result = await api.atualizarDescricaoVenda(id_venda, descricao);
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

      {sucesso.tipo != '' && (           
        <ToastPersonalizado
          titulo={sucesso.tipo=='success'? 'SUCESSO!' : 'ERRO!'}
          menssagem={sucesso.menssagem}
          cor={sucesso.tipo=='success'? 'success' : 'danger'}>
        </ToastPersonalizado>
      )}


     <h1>Histórico de Vendas
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
     </h1>
  

     <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
        <CCard className="mt-2">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell
                    onClick={() => setVendas(ordena(vendas, 'nome_pessoa', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="col-sm-6">Comprador
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setVendas(ordena(vendas, 'status', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Status
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setVendas(ordena(vendas, 'data', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Data
                    <CIcon icon={ordemCrescente ? cilSortNumericDown : cilSortNumericUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setVendas(ordena(vendas, 'valor_total', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Valor Total
                    <CIcon icon={ordemCrescente ? cilSortNumericDown : cilSortNumericUp} size="lg"/>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vendasCorrentes.map((venda) => (
                  <React.Fragment key={venda.id_venda}>
                    <CTableRow key={venda.id_venda} onClick={() => openModal(venda.id_venda)}>
                      <CTableDataCell>{`${venda.nome_pessoa} ${venda.sobrenome_pessoa}`}</CTableDataCell>
                      <CTableDataCell className="text-center"><CBadge color={venda.status == 'Pago'? "success" : "warning"} shape="rounded-pill">{venda.status}</CBadge></CTableDataCell>
                      <CTableDataCell className="text-center">{venda.data.split('-').reverse().join('/')}</CTableDataCell>
                      <CTableDataCell className="text-center">{venda.valor_total}</CTableDataCell>
                    </CTableRow>
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


      <CModal alignment="center" scrollable visible={modalVenda && !modalPag} onClose={closeModal} backdrop="static" size="lg" >
        <CModalHeader>
        <CCardTitle component="h5">
          Número da Venda: {id_venda}
        </CCardTitle>
        </CModalHeader>
        <CModalBody>
        
          {infos && (
            <>
              <CRow className="row g-2">
                <CCard className="mt-3 border-0">
                  <CCardTitle component="h5"> Comprador: {`${infos.nome_pessoa} ${infos.sobrenome_pessoa}`}</CCardTitle>
                  <CRow className="row g-2">
                    <CCol xs={6}>
                      <CListGroup>
                        <CListGroupItem>Secretário(a): {`${infos.nome_lider} ${infos.sobrenome_lider}`}</CListGroupItem>
                        <CListGroupItem>Data: {infos.data.split('-').reverse().join('/')}</CListGroupItem>
                      </CListGroup>
                    </CCol>

                    <CCol xs={6}>
                      <CListGroup>
                        <CListGroupItem>Valor Total: {infos.valor_total}</CListGroupItem>
                        <CListGroupItem>Status: <CBadge color={infos.status == 'Pago'? "success" : "warning"} shape="rounded-pill">{infos.status}</CBadge></CListGroupItem>
                      </CListGroup>
                    </CCol>
                  </CRow>
                </CCard>                
              </CRow>

              <CRow className="row g-2">
                <CCard className="mt-5 border-0">
                  <CCardTitle component="h5">Materiais Vendidos</CCardTitle>          
                  <CCol xs={12}>
                    <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
                      <CTableHead color="dark">
                        <CTableRow>
                          <CTableHeaderCell className="col-xs-3">Material</CTableHeaderCell>
                          <CTableHeaderCell className="text-center col-xs-3">Quantidade</CTableHeaderCell>
                          <CTableHeaderCell className="text-center col-xs-3">Preço Unitário</CTableHeaderCell>                          
                          <CTableHeaderCell className="text-center col-xs-3">Total</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {materiais.map((material) => (
                          <CTableRow key={material.id_material} color="info">      
                            <CTableDataCell>{materiais.find(item => item.id_material === material.id_material)?.nome}</CTableDataCell>
                            <CTableDataCell className="text-center">{material.quantidade}</CTableDataCell>
                            <CTableDataCell className="text-center">{material.valor_unit}</CTableDataCell>
                            <CTableDataCell className="text-center">{material.quantidade * material.valor_unit}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>                        
                  </CCol>                   
                </CCard>                
              </CRow>

              <CRow className="row g-2">
                <CCard className="mt-5 border-0">
                  <CCardTitle component="h5">Pagamentos</CCardTitle>
                  {pagamentos.length === 0 ? (
                    <p>Nenhum pagamento realizado</p>
                  ) : (
                    <CRow className="row g-2 my-2">
                      {pagamentos.map((pagamento) => (
                        <React.Fragment key={pagamento.id_pagamento}>
                          <CRow>                      
                            <CCol xs={6}>
                              <CListGroup>
                                <CListGroupItem>Secretário(a): {`${pagamento.nome_lider} ${pagamento.sobrenome_lider}`}</CListGroupItem>
                                <CListGroupItem>Data: {pagamento.data.split('-').reverse().join('/')}</CListGroupItem>
                              </CListGroup>
                              
                            </CCol>
                        
                            <CCol xs={6}>
                              <CListGroup>
                                <CListGroupItem>Valor Pago: {pagamento.valor_pago}</CListGroupItem>
                                <CListGroupItem>Tipo: {pagamento.tipo}</CListGroupItem>
                              </CListGroup>
                              
                            </CCol>    
                          </CRow>
                          <hr style={{ height: '4px', backgroundColor: 'black' }} />
                        </React.Fragment>                       
                      ))}          
                    </CRow>
                  )}
                  {infos.status == 'Pendente' ? (                 
                    <CRow className="row mt-4">
                      <CCol xs={12}>
                        <CCardTitle component="h5">Valor Restante: {numeral(valor_restante).format('0,0.00')}</CCardTitle>
                      </CCol>                
                    </CRow>                  
                  ) : (null)}
                </CCard>                
              </CRow>

              <CRow className="row mt-4">
                <CCol xs={12}>
                  {loadingSalvar && (
                    <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
                  )}

                  <DescricaoField
                    onChange={setDescricao} descricao={descricao}>
                  </DescricaoField>

                  <CRow>
                    <CCol>
                      <CButton color="success" onClick={salvarDescricao}>{loadingSalvar ? 'Salvando' : 'Salvar Anotação'}</CButton>
                    </CCol>
                    <CCol>
                      {sucesso.tipo != '' && (
                        <CAlert color={sucesso.tipo} className="d-flex align-items-center">
                          <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
                          <div>{sucesso.menssagem}</div>
                        </CAlert>
                      )}                                
                    </CCol>
                  </CRow>                          

                </CCol>
              </CRow>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CRow>
            <CCol xs={8}>
              <CButton color="info" onClick={() => { setSucesso({ tipo: '', menssagem: '' }); setModalPag(true); }}>Novo Pagamento</CButton>
            </CCol>
            <CCol xs={4}>
              <CButton color="secondary" onClick={closeModal}>Fechar</CButton>
            </CCol>      
          </CRow>
        </CModalFooter>
      </CModal>

      {modalPag && (
        <ModalPagamento
          id_venda={id_venda} valor_restante={valor_restante} modalPag={modalPag} onChange={closeModalPag} sucesso={sucesso} setSucesso={setSucesso}>
        </ModalPagamento>
      )}
    </>
  );
};

export default HistoricoVendas;
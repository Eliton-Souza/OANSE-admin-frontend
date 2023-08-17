import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormFeedback, CFormSelect, CFormCheck, CRow, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardImage, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';
import { NomeField } from '../components/formulario/nome';
import { NascimentoField } from '../components/formulario/nascimento';
import { hasCampoIncorreto, regexNameMaterial, regexQuantidade } from '../components/formulario/helper';


import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';
import { QuantidadeFild } from 'src/components/formulario/quantidade';


const VerEstoque = () => {
  const [loading, setLoading] = useState();
  const [materiais, setMateriais] = useState([]);
  const [selectedMaterial, setSelectdMaterial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //formulario
  const [editar, setEditar] = useState(false);

  //dados
  const [nome, setNome] = useState('');
  const [clube, setClube] = useState('');
  const [quantidade, setQuantidade] = useState('');
 


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);
  const [contatoIncorreto, setContatoIncorreto] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);


  const getMateriais = async () => {
    setLoading(true);
    const result = await api.listarMateriais();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setMateriais(result.materiais);
    }
  };

  useEffect(() => {
    getMateriais();
  }, []);

  const openModal= async (id) => {
    setLoading(true);
    const material = await api.pegarMaterial(id);
    setLoading(false);

    setSelectdMaterial(material);
    setModalOpen(true);

    setDados(material)
  }

  const setDados=(dado)=>{
    setNome(dado.nome);
    setClube(dado.clube);
    setQuantidade(dado.quantidade);
  }
   

  const closeModal = () => {
    setSelectdMaterial(null);
    setModalOpen(false);
    setEditar(false);
    setSucesso({tipo: '', menssagem: ''});
  };

  const salvarAlteracoes= async () => {
    setLoading(true);
    const result = await api.atualizarResponsavel(selectedMaterial.id_responsavel, nome, sobrenome, clube, nascimento, quantidade);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Responsável atualizado com sucesso"});
      getMateriais();

      setEditar(false);

      setTimeout(() => {
        setSucesso({tipo: '', menssagem: ''});
      }, 3000); // 3 segundos
    }

    setLimparValidacao(true);
    
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };

  /*// Configurações da paginação

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 5;
  const totalItems = materiais.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de materiais a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlunos = materiais.slice(startIndex, endIndex);*/

  

  return (
    <>
     <h1 style={{ fontSize: '24px' }}>Estoque de materiais
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
                  <CTableHeaderCell className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Nome</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Clube</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Quantidade</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {materiais.map((material) => (
                  <CTableRow key={material.id_material} onClick={() => openModal(material.id_material)}>      
                    <CTableDataCell>{material.nome}</CTableDataCell>
                    <CTableDataCell className="text-center">{material.clube}</CTableDataCell>
                    <CTableDataCell className="text-center">{material.quantidade}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal alignment="center" scrollable visible={modalOpen} onClose={closeModal} backdrop="static" size="lg" >
        <CModalHeader>
          <CModalTitle>{selectedMaterial && `${selectedMaterial.nome}`}
          {sucesso.tipo != '' && (
            <CAlert color={sucesso.tipo} className="d-flex align-items-center">
              <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{sucesso.menssagem}</div>
            </CAlert>
          )}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
          {selectedMaterial && (
            <>
              <CForm className="row g-3">
                <CRow className="row g-4">
                  <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
                    <NomeField
                      nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={false} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNameMaterial}>
                    </NomeField>
                  </CCol>
                </CRow>

             

                <CRow className="row g-3">
                  <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                    <QuantidadeFild
                      quantidade={quantidade} onChange={setQuantidade} desabilitado={!editar} incorreto={setContatoIncorreto} limpar={limparValidacao} regexQuantidade={regexQuantidade}>
                    </QuantidadeFild>
                  </CCol>
                </CRow>
              </CForm>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CRow>
            <CCol xs={4}>
              <CButton color="secondary" onClick={closeModal}>Fechar</CButton>
            </CCol>

            <CCol xs={4}>
              <CButton color="warning" onClick={() => setEditar(!editar)}>Editar</CButton>
            </CCol>

            <CCol xs={4}>
              <CButton color="success" onClick={salvarAlteracoes} type="submit" disabled={editar === false || hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto, contatoIncorreto])}>{loading ? 'Carregando' : 'Salvar'}</CButton>
            </CCol>
          </CRow>
        </CModalFooter>
      </CModal>

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

export default VerEstoque;
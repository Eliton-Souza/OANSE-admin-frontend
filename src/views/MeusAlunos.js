import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormFeedback, CFormSelect, CFormCheck, CRow, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardImage, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';
import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { NascimentoField } from '../components/formulario/nascimento';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto } from '../components/formulario/helper';
import { ManualField } from '../components/formulario/manual';

import { SaldoField } from '../components/widget/saldo';
import { ResponsavelField } from '../components/formulario/responsavel';
import { ClubeField } from '../components/widget/clube';
import { IdadeField } from 'src/components/widget/idade';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';
import { ModalSaldoField } from 'src/components/modalSaldo';

const MeusAlunos = () => {
  const [loading, setLoading] = useState();
  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSaldo, setModalSaldo] = useState(false)
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //formulario
  const [editar, setEditar] = useState(false);

  //dados
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [manual, setManual] = useState({ id_manual: null, nome: '', clube: '' });
  const [responsavel, setResponsavel] = useState({ id_responsavel: null, nome: '' });

  const [id_aluno, setId_Aluno] = useState('');
  const [id_carteira, setId_Carteira] = useState('');
  const [saldo, setSaldo] = useState('');


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);


  const getAlunos = async () => {
    setLoading(true);
    const result = await api.listarTodosAlunos();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setAlunos(result.alunos);
    }
  };

  useEffect(() => {
    getAlunos();
  }, []);

  const openModal= async (id) => {
    setLoading(true);
    const aluno = await api.pegarAluno(id);
    setLoading(false);

    setSelectedAluno(aluno);
    setModalOpen(true);

    setDados(aluno)
  }

  const setDados=(dado)=>{
    setNome(dado.nome);
    setSobrenome(dado.sobrenome);
    setGenero(dado.genero);
    setNascimento(dado.nascimento);
    setManual({ id_manual: dado.id_manual, nome: dado.manual, clube: dado.clube });
    setResponsavel({ id_responsavel: dado.id_responsavel? dado.id_responsavel: null, nome: dado.nome_responsavel? `${dado.nome_responsavel} ${dado.sobrenome_responsavel}` : '' });
    
    setId_Aluno(dado.id_aluno);
    setId_Carteira(dado.id_carteira);
    setSaldo(dado.saldo);
  }
   

  const closeModal = () => {
    setSelectedAluno(null);
    setModalOpen(false);
    setEditar(false);
    setSucesso({tipo: '', menssagem: ''});
  };

  const salvarAlteracoes= async () => {
    setLoading(true);
    const result = await api.atualizarAluno(selectedAluno.id_aluno, nome, sobrenome, genero, nascimento, responsavel.id_responsavel, manual.id_manual );
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Aluno atualizado com sucesso"});
      getAlunos();

      setEditar(false);

      setTimeout(() => {
        setSucesso({tipo: '', menssagem: ''});
      }, 1500); // 1.5 segundos
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
  const totalItems = alunos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de alunos a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlunos = alunos.slice(startIndex, endIndex);*/

  

  return (
    <>
     <h1 style={{ fontSize: '24px' }}>Meus Alunos
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
     </h1>
      <CCol xs={12}>
        <CCard className="mt-2">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">Nome</CTableHeaderCell>
                  <CTableHeaderCell className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">Manual</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {alunos.map((aluno) => (
                  <CTableRow v-for="item in tableItems" key={aluno.id_aluno} onClick={() => openModal(aluno.id_aluno)}>      
                    <CTableDataCell>{`${aluno.nome} ${aluno.sobrenome}`}</CTableDataCell>
                    <CTableDataCell>{aluno.manual}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal alignment="center" scrollable visible={modalOpen && !modalSaldo} onClose={closeModal} backdrop="static" size="lg" > {/*fullscreen="md"*/}
        <CModalHeader>
          <CModalTitle>{selectedAluno && `${selectedAluno.nome} - ${selectedAluno.id_aluno}`}
          
          {sucesso.tipo != '' && (
            <CAlert color={sucesso.tipo} className="d-flex align-items-center">
              <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{sucesso.menssagem}</div>
            </CAlert>
          )}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
          {selectedAluno && (
            <>
              <CForm className="row g-3">
                <CRow className="row g-1">
                  <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
                    <NomeField
                      nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={false} incorreto={setNomeIncorreto} limpar={limparValidacao}>
                    </NomeField>
                  </CCol>

                  <CCol xs={7} sm={7} md={7} lg={7} xl={7}>
                    <SobrenomeField
                      sobrenome={sobrenome} onChange={setSobrenome} desabilitado={!editar} obrigatorio={false} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
                    </SobrenomeField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={6} sm={5} md={5} lg={5} xl={5}>
                    <NascimentoField
                      nascimento={nascimento} onChange={setNascimento} desabilitado={!editar} obrigatorio={false} incorreto={setNascimentoIncorreto} limpar={limparValidacao}>
                    </NascimentoField>
                  </CCol> 

                  <CCol xs={6} sm={7} md={7} lg={7} xl={7}>
                    <GeneroField
                      genero={genero} onChange={setGenero} desabilitado={!editar} obrigatorio={false}>
                    </GeneroField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={12} sm={6} md={6} lg={6} xl={6}>
                    <ManualField
                      manual={manual} onChange={setManual} desabilitado={!editar} obrigatorio={false}>
                    </ManualField>
                  </CCol>
             
                  <CCol xs={12} sm={5} md={5} lg={5} xl={6}>
                    <ResponsavelField
                      responsavel={responsavel} onChange={setResponsavel} desabilitado={!editar} obrigatorio={false}>
                    </ResponsavelField>
                  </CCol>
                </CRow>

                <CRow className="row g-3"> 
                  <CCol xs={4} sm={4} md={4} lg={4} xl={4}>
                    <SaldoField
                      saldo={selectedAluno.saldo} id_carteira={selectedAluno.id_carteira} modalSaldo={setModalSaldo}>
                    </SaldoField>
                  </CCol>

                  <CCol xs={5} sm={5} md={4} lg={4} xl={4}>
                    <ClubeField
                      clube={manual.clube}>
                    </ClubeField>
                  </CCol>

                  <CCol xs={3} sm={3} md={4} lg={4} xl={4}>
                    <IdadeField
                      nascimento={nascimento}>
                    </IdadeField>
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
              <CButton color="success" onClick={salvarAlteracoes} type="submit" disabled={editar === false || hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto])}>{loading ? 'Carregando' : 'Salvar'}</CButton>
            </CCol>

          </CRow>
        </CModalFooter>

      </CModal>

      {modalSaldo && (
          <ModalSaldoField
          id_carteira={id_carteira} id_aluno={id_aluno} modalSaldo={modalSaldo} onChange={setModalSaldo} saldo={saldo} nome={`${nome} ${sobrenome}`}>
          </ModalSaldoField>
      )}
      
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

export default MeusAlunos;
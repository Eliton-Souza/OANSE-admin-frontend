import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormFeedback, CFormSelect, CFormCheck, CRow, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardImage, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';
import Paginacao from '../components/paginacao';
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
import { cilCheckCircle } from '@coreui/icons';

const MeusAlunos = () => {
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sucesso, setSucesso] = useState();

  //formulario
  const [editar, setEditar] = useState(false);

  //dados
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [manual, setManual] = useState({ id_manual: null, nome: '', clube: '' });
  const [responsavel, setResponsavel] = useState({ id_responsavel: null, nome: '' });


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);


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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
  }
   
  

  const closeModal = () => {
    setSelectedAluno(null);
    setModalOpen(false);
    setEditar(false);
  };

  const salvarAlteracoes= async () => {
    setLoading(true);
    const result = await api.atualizarAluno(selectedAluno.id_aluno, nome, sobrenome, genero, nascimento, responsavel.id_responsavel, manual.id_manual );
    setLoading(false);

    if (result.error) {
      setSucesso(false);
    } else {
      setSucesso(true);
    }

    getAlunos();
    setEditar(false);

    setTimeout(() => {
      setSucesso();
    }, 4000); // 4 segundos

  };

  // Configurações da paginação
  const itemsPerPage = 5;
  const totalItems = alunos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de alunos a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlunos = alunos.slice(startIndex, endIndex);

  

  return (
    <>
     <h1 style={{ fontSize: '24px' }}>Meus Alunos
        {loading && (
          <CSpinner color="success" size="xl" style={{ marginLeft: '15px' }}/>
        )}
     </h1>

      <CTable striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '175px' }}>Manual</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentAlunos.map((aluno) => (
            <CTableRow key={aluno.id_aluno} onClick={() => openModal(aluno.id_aluno)}>      
              <CTableDataCell>{`${aluno.nome} ${aluno.sobrenome}`}            
              </CTableDataCell>
              <CTableDataCell>{aluno.manual}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

   
        



      {/* 
     "id_aluno": 101,
      "id_carteira": 104,
      "saldo": 50,
      "nome": "Eliton",
      "sobrenome": "Aluno",
      "genero": "M",
      "nascimento": "1999-03-25",
      "id_manual": 24,
      "manual": "Manual Homens e Mulheres de Deus EC4",
      "clube": "VQ7",
      "id_clube": 6,
      "id_responsavel": null,
      "nome_responsavel": null,
      "sobrenome_responsavel": null,
      "genero_responsavel": null,
      "contato_responsavel": null,
      "nascimento_responsavel": null
      */}

      <CModal alignment="center" scrollable visible={modalOpen} onClose={closeModal} backdrop="static" size="lg" > {/*fullscreen="md"*/}
        <CModalHeader>
          <CModalTitle>{selectedAluno && `${selectedAluno.nome} - ${selectedAluno.id_aluno}`}
          
          {sucesso && (
            <CAlert color="success" className="d-flex align-items-center">
              <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>Aluno Atualizado com sucesso</div>
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
                      nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={false} incorreto={setNomeIncorreto}>
                    </NomeField>
                  </CCol>

                  <CCol xs={7} sm={7} md={7} lg={7} xl={7}>
                    <SobrenomeField
                      sobrenome={sobrenome} onChange={setSobrenome} desabilitado={!editar} obrigatorio={false} incorreto={setSobrenomeIncorreto}>
                    </SobrenomeField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={6} sm={5} md={5} lg={5} xl={5}>
                    <NascimentoField
                      nascimento={nascimento} onChange={setNascimento} desabilitado={!editar} obrigatorio={false} incorreto={setNascimentoIncorreto}>
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
                      manual={manual.nome} onChange={setManual} desabilitado={!editar} obrigatorio={false}>
                    </ManualField>
                  </CCol>
             
                  <CCol xs={12} sm={5} md={5} lg={5} xl={6}>
                    <ResponsavelField
                      responsavel={responsavel.nome} onChange={setResponsavel} desabilitado={!editar} obrigatorio={false}>
                    </ResponsavelField>
                  </CCol>
                </CRow>

                <CRow className="row g-3"> 
                  <CCol xs={3} sm={7} md={7} lg={7} xl={4}>
                    <SaldoField
                      saldo={selectedAluno.saldo}>
                    </SaldoField>
                  </CCol>

                  <CCol xs={5} sm={7} md={7} lg={7} xl={4}>
                    <ClubeField
                      clube={manual.clube}>
                    </ClubeField>
                  </CCol>

                  <CCol xs={4} sm={7} md={7} lg={7} xl={4}>
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
              <CButton color="success" onClick={salvarAlteracoes} type="submit" disabled={editar === false || hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto])}>Salvar</CButton>
            </CCol>

          </CRow>
        </CModalFooter>

      </CModal>
      
      <Paginacao
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

    </>
  );
};

export default MeusAlunos;
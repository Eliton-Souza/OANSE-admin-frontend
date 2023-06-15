import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormFeedback, CFormSelect, CFormCheck, CRow, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardImage } from '@coreui/react';
import { api } from 'src/services/api';
import { differenceInYears } from 'date-fns';
import Paginacao from './paginacao';
import { NomeField } from './formulario/nome';
import { SobrenomeField } from './formulario/sobrenome';
import { NascimentoField } from './formulario/nascimento';
import { GeneroField } from './formulario/genero';
import { hasCampoIncorreto } from './formulario/helper';
import { ManualField } from './formulario/manual';

import { SaldoField } from './widget/saldo';
import { ResponsavelField } from './formulario/responsavel';
import { ClubeField } from './widget/clube';

const TabelaAluno = () => {
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  //formulario
  const [editar, setEditar] = useState(false);

  //dados
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [genero, setGenero] = useState('');
  const [manual, setManual] = useState({ id_manual: '', nome: '', clube: '' });
  const [responsavel, setResponsavel] = useState({ id_responsavel: '', nome: '' });


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);


  const getAlunos = async () => {
    setLoading(true);
    const result = await api.pegarAlunos();
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

  const openModal = (aluno) => {
    setSelectedAluno(aluno);
    setModalOpen(true);

    setNome(aluno.nome);
    setSobrenome(aluno.sobrenome);
    setGenero(aluno.genero);
    setNascimento(aluno.nascimento);
    setManual({ id_manual: aluno.id_manual, nome: aluno.manual, clube: aluno.clube });
    setResponsavel({ id_responsavel: aluno.id_responsavel, nome: (aluno.nome_responsavel + aluno.sobrenome_responsavel) });
    };
  

  const closeModal = () => {
    setSelectedAluno(null);
    setModalOpen(false);
    setEditar(false);
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
      <CTable loading={loading.toString()} striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '75px' }}>Clube</CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '1px' }}>Idade</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentAlunos.map((aluno) => (
            <CTableRow key={aluno.id_aluno} onClick={() => openModal(aluno)}>
             <CTableDataCell>{`${aluno.nome} ${aluno.sobrenome}`}</CTableDataCell>
              <CTableDataCell>{aluno.clube}</CTableDataCell>
              <CTableDataCell>{differenceInYears(new Date(), new Date(aluno.nascimento))}</CTableDataCell>
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
          <CModalTitle>{selectedAluno && `${selectedAluno.nome} - ${selectedAluno.id_aluno}`}</CModalTitle>
        </CModalHeader>
        <CModalBody> {/*style={{ height: `400px` }}>*/}
        
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
                  <CCol xs={5} sm={7} md={7} lg={7} xl={3}>
                    <SaldoField
                      saldo={selectedAluno.saldo}>
                    </SaldoField>
                  </CCol>

                  <CCol xs={7} sm={7} md={7} lg={7} xl={3}>
                    <ClubeField
                      clube={manual.clube}>
                    </ClubeField>
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
              <CButton color="success" type="submit" disabled={editar === false || hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto])}>Salvar</CButton>
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

export default TabelaAluno;
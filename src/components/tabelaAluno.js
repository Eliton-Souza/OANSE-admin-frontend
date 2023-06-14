import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormFeedback, CFormSelect, CFormCheck, CRow } from '@coreui/react';
import { api } from 'src/services/api';
import { differenceInYears } from 'date-fns';
import Paginacao from './paginacao';
import { NomeField } from './formulario/nome';
import { SobrenomeField } from './formulario/sobrenome';
import { NascimentoField } from './formulario/nascimento';
import { GeneroField } from './formulario/genero';
import { hasCampoIncorreto } from './formulario/helper';

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
      "nome": "Eliton Aluno",
      "genero": "M",
      "nascimento": "1999-03-25",
      "clube": "VQ7",
      "id_clube": 6,
      "manual": "Manual Homens e Mulheres de Deus EC4",
      "id_responsavel": null,
      "nome_responsavel": "null null",
      "genero_responsavel": null,
      "contato_responsavel": null,
      "nascimento_responsavel": null
      */}

      <CModal scrollable visible={modalOpen} onClose={closeModal} backdrop="static">
        <CModalHeader>
          <CModalTitle>{selectedAluno && `${selectedAluno.nome} ${selectedAluno.id_aluno}`}</CModalTitle>
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
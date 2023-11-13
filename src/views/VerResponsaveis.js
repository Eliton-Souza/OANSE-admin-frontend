import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CRow, CCard, CCardHeader, CCardBody, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';
import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { Data } from '../components/formulario/data';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';

import { IdadeField } from 'src/components/widget/idade';
import CIcon from '@coreui/icons-react';
import { cilSortAlphaDown, cilSortAlphaUp, cilSortNumericDown, cilSortNumericUp } from '@coreui/icons';
import { ContatoField } from 'src/components/formulario/contato';
import { differenceInYears } from 'date-fns';
import { ordena } from './helper';
import { ToastPersonalizado } from 'src/components/formulario/toast';

const VerResponsaveis = () => {
  const [loading, setLoading] = useState();
  const [responsaveis, setResponsaveis] = useState([]);
  const [selectedResponsavel, setSelectedResponsavel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});
  const [ordemCrescente, setOrdemCrescente] = useState(true);

  //formulario
  const [editar, setEditar] = useState(false);

  //dados
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [contato, setContato] = useState(null);
 
  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);
  const [contatoIncorreto, setContatoIncorreto] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);


  const getResponsaveis = async () => {
    setLoading(true);
    const result = await api.listarResponsaveis();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setResponsaveis(result);
    }
  };

  useEffect(() => {
    getResponsaveis();
  }, []);

  const openModal= async (id) => {
    setLoading(true);
    const responsavel = await api.pegarResponsavel(id);
    setLoading(false);

    setSelectedResponsavel(responsavel);
    setModalOpen(true);

    setDados(responsavel)
  }

  const setDados=(dado)=>{
    setNome(dado.nome);
    setSobrenome(dado.sobrenome);
    setGenero(dado.genero);
    setNascimento(dado.nascimento);
    setContato(dado.contato);
  }
   

  const closeModal = () => {
    setSelectedResponsavel(null);
    setModalOpen(false);
    setEditar(false);
  };

  const salvarAlteracoes= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result = await api.atualizarResponsavel(selectedResponsavel.id_responsavel, nome, sobrenome, genero, nascimento, contato);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Responsável atualizado com sucesso"});
      getResponsaveis();

      setEditar(false);
      closeModal();
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
  const totalItems = responsaveis.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de responsaveis a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlunos = responsaveis.slice(startIndex, endIndex);*/

  

  return (
    <>
     {sucesso.tipo != '' && (           
        <ToastPersonalizado
          titulo={sucesso.tipo=='success'? 'SUCESSO!' : 'ERRO!'}
          menssagem={sucesso.menssagem}
          cor={sucesso.tipo=='success'? 'success' : 'danger'}>
        </ToastPersonalizado>
      )}

     <CCardHeader component="h1">Responsáveis
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
                    onClick={() => setResponsaveis(ordena(responsaveis, 'nome', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-6">Nome
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Contato</CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setResponsaveis(ordena(responsaveis, 'nascimento', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-3">Idade
                    <CIcon icon={ordemCrescente ? cilSortNumericDown : cilSortNumericUp} size="lg"/>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {responsaveis.map((responsavel) => (
                  <CTableRow key={responsavel.id_responsavel} onClick={() => openModal(responsavel.id_responsavel)}>      
                    <CTableDataCell className="text-center">{`${responsavel.nome} ${responsavel.sobrenome}`}</CTableDataCell>
                    <CTableDataCell className="text-center">{responsavel.contato}</CTableDataCell>
                    <CTableDataCell className="text-center">{responsavel.nascimento? differenceInYears(new Date(), new Date(responsavel.nascimento)) : ''}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal alignment="center" scrollable visible={modalOpen} onClose={closeModal} backdrop="static" size="lg" >
        <CModalHeader>
          <CModalTitle>
            {selectedResponsavel && `${selectedResponsavel.nome} - ${selectedResponsavel.id_responsavel}`}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
          {selectedResponsavel && (
            <>
              <CForm className="row g-3">
                <CRow className="row g-4">
                  <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
                    <NomeField
                      nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={false} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
                    </NomeField>
                  </CCol>

                  <CCol xs={7} sm={7} md={7} lg={7} xl={7}>
                    <SobrenomeField
                      sobrenome={sobrenome} onChange={setSobrenome} desabilitado={!editar} obrigatorio={false} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
                    </SobrenomeField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={6} sm={6} md={6} lg={6} xl={5}>
                    <Data
                       data={nascimento} onChange={setNascimento} desabilitado={!editar} obrigatorio={false} incorreto={setNascimentoIncorreto} label={'Nascimento'} limpar={limparValidacao}>
                    </Data>
                  </CCol> 

                  <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                    <GeneroField
                      genero={genero} onChange={setGenero} desabilitado={!editar} obrigatorio={false}>
                    </GeneroField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={6} sm={6} md={6} lg={6} xl={5}>
                    <IdadeField
                     nascimento={nascimento}>
                    </IdadeField>
                  </CCol>

                  <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                    <ContatoField
                      contato={contato} onChange={setContato} desabilitado={!editar} incorreto={setContatoIncorreto} limpar={limparValidacao} obrigatorio={false} label={'Telefone'}>
                    </ContatoField>
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

export default VerResponsaveis;
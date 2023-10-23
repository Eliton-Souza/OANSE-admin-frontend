import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormFeedback, CFormSelect, CFormCheck, CRow, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CCardImage, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';
import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { Data } from '../components/formulario/data';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';

import { IdadeField } from 'src/components/widget/idade';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash, cilSortAlphaDown, cilSortAlphaUp, cilSortNumericDown, cilSortNumericUp } from '@coreui/icons';
import { differenceInYears } from 'date-fns';
import { ordena } from './helper';
import { ClubeField } from 'src/components/widget/clube';


const VerResponsaveis = () => {
  const [loading, setLoading] = useState();
  const [lideres, setLideres] = useState([]);
  const [selectedLider, setSelectedLider] = useState(null);
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
  const [clube, setClube] = useState('');
 


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);
  const [contatoIncorreto, setContatoIncorreto] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);


  const getLideres = async () => {
    setLoading(true);
    const result = await api.listarLideres();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setLideres(result);
    }
  };

  useEffect(() => {
    getLideres();
  }, []);

  const openModal= async (id) => {
    setLoading(true);
    const lider = lideres.find(item => item.id_lider == id);
    setLoading(false);

    setSelectedLider(lider);
    setModalOpen(true);

    setDados(lider)
  }

  const setDados=(dado)=>{
    setNome(dado.nome);
    setSobrenome(dado.sobrenome);
    setGenero(dado.genero);
    setNascimento(dado.nascimento);
    setClube(dado.clube);
  }
   

  const closeModal = () => {
    setSelectedLider(null);
    setModalOpen(false);
    setEditar(false);
    setSucesso({tipo: '', menssagem: ''});
  };

  /*const salvarAlteracoes= async () => {
    setLoading(true);
    const result = await api.atualizarResponsavel(selectedLider.id_responsavel, nome, sobrenome, genero, nascimento, contato);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Responsável atualizado com sucesso"});
      getLideres();

      setEditar(false);

      setTimeout(() => {
        setSucesso({tipo: '', menssagem: ''});
      }, 3000); // 3 segundos
    }

    setLimparValidacao(true);
    
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };*/

  return (
    <>
     <h1>Líderes
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
                    onClick={() => setLideres(ordena(lideres, 'nome', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-6">Nome
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => setLideres(ordena(lideres, 'clube', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-3">Clube
                    <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                  </CTableHeaderCell>                  
                  <CTableHeaderCell
                    onClick={() => setLideres(ordena(lideres, 'nascimento', ordemCrescente),
                    setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-3">Idade
                    <CIcon icon={ordemCrescente ? cilSortNumericDown : cilSortNumericUp} size="lg"/>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {lideres.map((lider) => (
                  <CTableRow key={lider.id_lider} onClick={() => openModal(lider.id_lider)}>      
                    <CTableDataCell className="text-center">{`${lider.nome} ${lider.sobrenome}`}</CTableDataCell>
                    <CTableDataCell className="text-center">{lider.clube}</CTableDataCell>
                    <CTableDataCell className="text-center">{lider.nascimento? differenceInYears(new Date(), new Date(lider.nascimento)) : ''}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal alignment="center" scrollable visible={modalOpen} onClose={closeModal} backdrop="static" size="lg" >
        <CModalHeader>
          <CModalTitle>{selectedLider && `${selectedLider.nome} ${selectedLider.sobrenome}- ${selectedLider.id_lider}`}
          {sucesso.tipo != '' && (
            <CAlert color={sucesso.tipo} className="d-flex align-items-center">
              <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{sucesso.menssagem}</div>
            </CAlert>
          )}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
          {selectedLider && (
            <>
              <CForm className="row g-3">
                <CRow className="row g-4">
                  <CCol sm={6}>
                    <NomeField
                      nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={false} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
                    </NomeField>
                  </CCol>

                  <CCol sm={6}>
                    <SobrenomeField
                      sobrenome={sobrenome} onChange={setSobrenome} desabilitado={!editar} obrigatorio={false} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
                    </SobrenomeField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol sm={6}>
                    <Data
                       data={nascimento} onChange={setNascimento} desabilitado={!editar} obrigatorio={false} incorreto={setNascimentoIncorreto} label={'Nascimento'} limpar={limparValidacao}>
                    </Data>
                  </CCol> 

                  <CCol sm={6}>
                    <GeneroField
                      genero={genero} onChange={setGenero} desabilitado={!editar} obrigatorio={false}>
                    </GeneroField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol sm={6}>
                    <IdadeField
                     nascimento={nascimento}>
                    </IdadeField>
                  </CCol>

                  <CCol sm={6}>
                    <ClubeField
                      clube={clube}>
                    </ClubeField>                    
                  </CCol>
                </CRow>
              </CForm>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CRow>
            <CCol xs={6}>
              <CButton color="secondary" onClick={closeModal}>Fechar</CButton>
            </CCol>

             {/*<CCol xs={4}>
             <CButton color="warning" onClick={() => setEditar(!editar)}>Editar</CButton>
          </CCol>

            <CCol xs={6}>
              <CButton color="success" onClick={salvarAlteracoes} type="submit" disabled={editar === false || hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto, contatoIncorreto])}>{loading ? 'Carregando' : 'Salvar'}</CButton>
            </CCol>*/}
          </CRow>
        </CModalFooter>
      </CModal>

    </>
  );
};

export default VerResponsaveis;
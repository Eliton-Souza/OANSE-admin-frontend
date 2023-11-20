import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CRow, CCard, CCardHeader, CCardBody, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';
import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { Data } from '../components/formulario/data';
import { GeneroField } from '../components/formulario/genero';
import { regexNamePessoa } from '../components/formulario/helper';

import { IdadeField } from 'src/components/widget/idade';
import CIcon from '@coreui/icons-react';
import { cilSortAlphaDown, cilSortAlphaUp, cilSortNumericDown, cilSortNumericUp } from '@coreui/icons';
import { differenceInYears } from 'date-fns';
import { ordena } from './helper';
import { ClubeField } from 'src/components/widget/clube';
import { ModalEditaLider } from 'src/components/modalEditaLider';
import { ToastPersonalizado } from 'src/components/formulario/toast';


const VerResponsaveis = () => {
  const [loading, setLoading] = useState();
  const [lideres, setLideres] = useState([]);
  const [selectedLider, setSelectedLider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});
  const [ordemCrescente, setOrdemCrescente] = useState(true);

  //formulario
  const [modalEditar, setModalEditar] = useState(false);

  //dados
  const [id_lider, setIdLider] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [clube, setClube] = useState( {id_clube: null, nome: ''});


  const getLideres = async () => {
    setLoading(true);
    const result = await api.listarLideres();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setLideres(ordena(result, 'id_clube', true));
    }
  };

  useEffect(() => {
    if(!modalEditar){
      getLideres();
    }
  }, [modalEditar]);

  const openModal= async (id) => {
    setLoading(true);
    const lider = lideres.find(item => item.id_lider == id);
    setLoading(false);

    setSelectedLider(lider);
    setModalOpen(true);

    setDados(lider)
  }

  const setDados=(dado)=>{
    setIdLider(dado.id_lider);
    setNome(dado.nome);
    setSobrenome(dado.sobrenome);
    setGenero(dado.genero);
    setNascimento(dado.nascimento);
    setClube({ id_clube: dado.id_clube, nome: dado.clube});
  }
   

  const closeModal = () => {
    setSelectedLider(null);
    setModalOpen(false);
  };

  return (
    <>
      {sucesso.tipo != '' && (           
        <ToastPersonalizado
          titulo={sucesso.tipo=='success'? 'SUCESSO!' : 'ERRO!'}
          menssagem={sucesso.menssagem}
          cor={sucesso.tipo=='success'? 'success' : 'danger'}>
        </ToastPersonalizado>
      )}

      <CCardHeader component="h1">Líderes
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

      <CModal alignment="center" scrollable visible={modalOpen && !modalEditar} onClose={closeModal} backdrop="static" size="lg" >
        <CModalHeader>
          <CModalTitle>
            {selectedLider && `${selectedLider.nome} ${selectedLider.sobrenome}- ${selectedLider.id_lider}`}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
          {selectedLider && (
            <>
              <CForm className="row g-3">
                <CRow className="row g-2">
                  <CCol xs={6}>
                    <NomeField
                      nome={nome} onChange={setNome} desabilitado={true} obrigatorio={false} regexName={regexNamePessoa}>
                    </NomeField>
                  </CCol>

                  <CCol xs={6}>
                    <SobrenomeField
                      sobrenome={sobrenome} onChange={setSobrenome} desabilitado={true} obrigatorio={false}>
                    </SobrenomeField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={6}>
                    <Data
                       data={nascimento} onChange={setNascimento} desabilitado={true} obrigatorio={false} label={'Nascimento'}>
                    </Data>
                  </CCol> 

                  <CCol xs={6}>
                    <GeneroField
                      genero={genero} onChange={setGenero} desabilitado={true} obrigatorio={false}>
                    </GeneroField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={6}>
                    <IdadeField
                     nascimento={nascimento}>
                    </IdadeField>
                  </CCol>

                  <CCol xs={6}>
                    <ClubeField
                      clube={clube.nome}>
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

            <CCol xs={4}>
              <CButton color="warning" onClick={() => { setModalEditar(true);}}>Editar</CButton>
            </CCol>
          </CRow>
        </CModalFooter>
      </CModal>


      {modalEditar && (
        <ModalEditaLider
          id_lider={id_lider} onChange={setModalEditar} clube={clube} setSucesso={setSucesso} nome={nome} genero={genero}>
        </ModalEditaLider>
      )}

    </>
  );
};

export default VerResponsaveis;
import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CRow, CCard, CCardHeader, CCardBody, CSpinner, CFormLabel } from '@coreui/react';

import { api, dadosUsuário } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { Data } from '../components/formulario/data';
import { GeneroField } from '../components/formulario/genero';

import { ManualField } from '../components/formulario/manual';
import { SaldoField } from '../components/widget/saldo';
import { IdadeField } from 'src/components/widget/idade';

import { ModalSaldoField } from 'src/components/modalSaldo';

import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';
import { SelectOansistas } from 'src/components/formulario/selectOansistas';
import { ToastPersonalizado } from 'src/components/formulario/toast';
import { ModalDeletarAluno } from 'src/components/modalDeletarAluno';


const MeusAlunos = () => {
  const [loading, setLoading] = useState();
  const [usuario, setUsuario] = useState();
  const [alunos, setAlunos] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [modalAluno, setModalAluno] = useState(false);
  const [modalSaldo, setModalSaldo] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //formulario
  const [editar, setEditar] = useState(false);

  //dados
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [manual, setManual] = useState({ id_manual: null, nome: '', clube: '' });
  const [responsavel, setResponsavel] = useState({ id_pessoa: null, nome: '' });

  const [id_aluno, setId_Aluno] = useState('');
  const [id_carteira, setId_Carteira] = useState('');
  const [saldo, setSaldo] = useState('');


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);


  const getAlunosClubes = async () => {
    setLoading(true);
    const listaAlunos = await api.listarTodosAlunos();
    const listaClubes= await api.listarClubes();
    setLoading(false);

    if (listaAlunos.error || listaClubes.error) {
      alert("Ocoreu um erro");
    } else {
      const clubesFiltrados = listaClubes.clubes.filter(clube => clube.id_clube <= 6);
      setAlunos(listaAlunos.alunos);
      setClubes(clubesFiltrados);
    }
  };

  useEffect(() => {
    const usuario= dadosUsuário();
    setUsuario(usuario.id_clube);
    getAlunosClubes();
  }, [modalDelete]);

  const openModal= async (id) => {
    setLoading(true);
    const aluno = await api.pegarAluno(id);
    setLoading(false);

    setSelectedAluno(aluno);
    setModalAluno(true);

    setDados(aluno)
  }

  const setDados=(dado)=>{
    setNome(dado.nome);
    setSobrenome(dado.sobrenome);
    setGenero(dado.genero);
    setNascimento(dado.nascimento);
    setManual({ id_manual: dado.id_manual, nome: dado.manual, clube: dado.clube });
    setResponsavel({ id_pessoa: dado.id_responsavel? dado.id_responsavel: null, nome: dado.nome_responsavel? `${dado.nome_responsavel} ${dado.sobrenome_responsavel}` : '' });
    
    setId_Aluno(dado.id_aluno);
    setId_Carteira(dado.id_carteira);
    setSaldo(dado.saldo);
  }
  

  const closeModal = () => {
    setSelectedAluno(null);
    setModalAluno(false);
    setEditar(false);
  };

  const salvarAlteracoes= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result = await api.atualizarAluno(selectedAluno.id_aluno, nome, sobrenome, genero, nascimento, responsavel.id_pessoa, manual.id_manual );
    setLoading(false);


    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Aluno atualizado com sucesso"});
      getAlunosClubes();

      setEditar(false);
    }

    setLimparValidacao(true);
    
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundo
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

      <CCardHeader component="h1">Meus Alunos
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </CCardHeader>

      <CRow>
        {usuario == '8'
          ? clubes.map(clubeMap => (
              <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
                <CCardHeader className="mt-4" component="h3">
                      {clubeMap.nome}
                    </CCardHeader>
                    <CCard className="mt-2">
                      <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
                          <CTableHead color='dark'>
                            <CTableRow>
                              <CTableHeaderCell className="text-center col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Nome</CTableHeaderCell>
                              <CTableHeaderCell className="text-center col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Manual</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {alunos.filter(alunoFilter => alunoFilter.id_clube == clubeMap.id_clube).map(alunoMap => (
                              <CTableRow key={alunoMap.id_aluno} onClick={() => openModal(alunoMap.id_aluno)}>      
                                <CTableDataCell className="text-center">{`${alunoMap.nome} ${alunoMap.sobrenome}`}</CTableDataCell>
                                <CTableDataCell className="text-center">{alunoMap.manual}</CTableDataCell>
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
              </CCol>
            ))
          : clubes
              .filter(clubeMap => clubeMap.id_clube === usuario)
              .map(clubeMap => (
                <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
                  <CCardHeader className="mt-4" component="h3">
                      {clubeMap.nome}
                    </CCardHeader>
                    <CCard className="mt-2">
                      <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
                          <CTableHead color='dark'>
                            <CTableRow>
                              <CTableHeaderCell className="text-center col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Nome</CTableHeaderCell>
                              <CTableHeaderCell className="text-center col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Manual</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {alunos.filter(alunoFilter => alunoFilter.id_clube == clubeMap.id_clube).map(alunoMap => (
                              <CTableRow key={alunoMap.id_aluno} onClick={() => openModal(alunoMap.id_aluno)}>      
                                <CTableDataCell className="text-center">{`${alunoMap.nome} ${alunoMap.sobrenome}`}</CTableDataCell>
                                <CTableDataCell className="text-center">{alunoMap.manual}</CTableDataCell>
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                </CCol>
              ))
        }
      </CRow>

      <CModal alignment="center" scrollable visible={modalAluno && !modalSaldo && !modalDelete} onClose={closeModal} backdrop="static" size="lg" >
        <CModalHeader>
          <CModalTitle>
            {selectedAluno && `${selectedAluno.nome} - ${selectedAluno.id_aluno}`}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
          {selectedAluno && (
            <>
              <CForm className="row g-3">
                <CRow className="row g-1">
                  <CCol xs={6}>
                    <NomeField
                      nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={false} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
                    </NomeField>
                  </CCol>

                  <CCol xs={6}>
                    <SobrenomeField
                      sobrenome={sobrenome} onChange={setSobrenome} desabilitado={!editar} obrigatorio={false} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
                    </SobrenomeField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={6}>
                    <Data
                      data={nascimento} onChange={setNascimento} desabilitado={!editar} obrigatorio={false} incorreto={setNascimentoIncorreto} label={'Nascimento'} limpar={limparValidacao}>
                    </Data>
                  </CCol> 

                  <CCol xs={6}>
                    <GeneroField
                      genero={genero} onChange={setGenero} desabilitado={!editar} obrigatorio={false}>
                    </GeneroField>
                  </CCol>
                </CRow>

                <CRow className="row g-3">
                  <CCol xs={12} md={6}>
                    <ManualField
                      manual={manual} onChange={setManual} desabilitado={!editar} obrigatorio={false}>
                    </ManualField>
                  </CCol>
             
                  <CCol xs={12} md={6}>
                    <CFormLabel>Responsável</CFormLabel>
                    <SelectOansistas
                      pessoa={responsavel} onChange={setResponsavel} desabilitado={!editar} obrigatorio={false}>                      
                    </SelectOansistas>                  
                  </CCol>
                </CRow>

                <CRow className="row g-3"> 
                  <CCol xs={6}>
                    <SaldoField
                      saldo={selectedAluno.saldo} id_carteira={selectedAluno.id_carteira} modalSaldo={setModalSaldo}>
                    </SaldoField>
                  </CCol>

                  <CCol xs={6}>
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
          {usuario === 8 && (
            <CButton color="danger" onClick={() => setModalDelete(true)} style={{ marginRight: '20px' }}>Deletar</CButton>
          )}
          
          <CButton color="warning" onClick={() => setEditar(!editar)} style={{ marginRight: '20px' }}>Editar</CButton>

          <CButton
            color="success"
            onClick={salvarAlteracoes}
            type="submit"
            disabled={editar === false || hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto])}
            style={{ marginRight: '15px' }}
          >
            {loading ? 'Salvando' : 'Salvar'}
          </CButton>
        </CModalFooter>

      </CModal>

      {modalSaldo && (
        <ModalSaldoField
          id_carteira={id_carteira} id_aluno={id_aluno} modalSaldo={modalSaldo} onChange={setModalSaldo} saldo={saldo} nome={`${nome} ${sobrenome}`} setSucesso={setSucesso}>
        </ModalSaldoField>
      )}

      {modalDelete && (
        <ModalDeletarAluno
          id_aluno={id_aluno} onChange={setModalDelete} nome={`${nome} ${sobrenome}`} setSucesso={setSucesso}>
        </ModalDeletarAluno>
      )}

    </>
  );
};

export default MeusAlunos;
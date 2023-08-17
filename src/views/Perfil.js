import React, { useState, useRef, useEffect } from 'react';
import { CButton, CForm, CCol, CRow, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { NascimentoField } from '../components/formulario/nascimento';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';

import { ClubeField } from '../components/widget/clube';
import { IdadeField } from 'src/components/widget/idade';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';

const Perfil = () => {

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  const [editar, setEditar] = useState(false);

  //dados
  const [id_lider, setId_Lider] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [clube, setClube] = useState('');


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);
  const [limparValidacao, setLimparValidacao] = useState(false);


  const pegaLider= async () => {

    setLoading(true);
    const result= await api.meusDadosLider();
    setLoading(false);

    if(result.error){
      alert("erro ao buscar seus dados");
    }else{
      setId_Lider(result.id_lider);
      setNome(result.nome);
      setSobrenome(result.sobrenome);
      setNascimento(result.nascimento);
      setGenero(result.genero);
      setClube(result.clube);
    }
  }
  useEffect(() => {
    pegaLider();
  }, []);


  //corrigir alteraçãos no banco, nao ta salvando
  const salvarAlteracoes= async () => {

    setLoading(true);
    const result= await api.atualizarLider(id_lider, nome, sobrenome, genero, nascimento);
    setLoading(false);

    if(result.error){
      setSucesso({tipo: 'danger', menssagem: result.error});
    }else{
      setSucesso({tipo: 'success', menssagem: "Lider atualizado com sucesso"});
    }

    setTimeout(() => {
      setSucesso({tipo: '', menssagem: ''});
    }, 5000); // 5 segundos

    setLimparValidacao(true);
    setEditar(false);
    
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  }
 

  return (
    <>
      <h1 style={{ fontSize: '24px' }}>Meu Perfil
          {loading && (
            <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
          )}
      </h1>

      {sucesso.tipo != '' && (
        <CAlert color={sucesso.tipo} className="d-flex align-items-center">
          <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>{sucesso.menssagem}</div>
        </CAlert>
      )}


      <CForm className="row g-3" ref={formRef} onSubmit={(event) => { event.preventDefault(); salvarAlteracoes();}}>
        
        <CRow className="row g-4">
          <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
            <NomeField
              nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={true} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
            </NomeField>
          </CCol>

          <CCol xs={7} sm={7} md={7} lg={7} xl={7}>
            <SobrenomeField
              sobrenome={sobrenome} onChange={setSobrenome} desabilitado={!editar} obrigatorio={true} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
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
              genero={genero} onChange={setGenero} desabilitado={!editar} obrigatorio={true}>
            </GeneroField>
          </CCol>
        </CRow>


        <CRow className="row g-3"> 
          <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
            <ClubeField
              clube={clube}>
            </ClubeField>
          </CCol>

          <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
            <IdadeField
              nascimento={nascimento}>
            </IdadeField>
          </CCol>
        </CRow>


        <CRow>
          <CCol xs={4}>
            <CButton color="warning" onClick={() => setEditar(!editar)}>Editar</CButton>
          </CCol>

          <CCol xs={4}>
            <CButton color="success" type="submit" disabled={editar === false || hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto])}>Salvar</CButton>
          </CCol>
        </CRow>
             
      </CForm>
    </>
  );
};

export default Perfil;
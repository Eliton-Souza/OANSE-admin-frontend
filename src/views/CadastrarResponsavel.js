import React, { useState, useRef } from 'react';
import { CButton, CForm, CCol, CRow, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { NascimentoField } from '../components/formulario/nascimento';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';
import { IdadeField } from 'src/components/widget/idade';

import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';
import { ContatoField } from 'src/components/formulario/contato';

const CadastrarResponsavel = () => {

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

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
 
  const Limpar = () => {  //ver logica

    formRef.current.reset();
    
    setNome('');
    setSobrenome('');
    setGenero('');
    setNascimento(null);
    setContato(null)
  
    setLimparValidacao(true);
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };

  //corrigir alteraçãos no banco, nao ta salvando
  const salvarAlteracoes= async () => {

    setLoading(true);
    const result= await api.criarResponsavel( nome, sobrenome, genero, nascimento, contato );
    setLoading(false);

    if(result.error){
      setSucesso({tipo: 'danger', menssagem: result.error});
    }else{
      setSucesso({tipo: 'success', menssagem: "Responsável cadastrado com sucesso"});
    }

    Limpar();

    setTimeout(() => {
      setSucesso({tipo: '', menssagem: ''});
    }, 5000); // 5 segundos
  }
 

  return (
    <>
      <h1>Novo Responsável
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
              nome={nome} onChange={setNome} desabilitado={loading} obrigatorio={true} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
            </NomeField>
          </CCol>

          <CCol xs={7} sm={7} md={7} lg={7} xl={7}>
            <SobrenomeField
              sobrenome={sobrenome} onChange={setSobrenome} desabilitado={loading} obrigatorio={true} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
            </SobrenomeField>
          </CCol>
        </CRow>

        <CRow className="row g-3">
          <CCol xs={6} sm={6} md={6} lg={6} xl={5}>
            <NascimentoField
              nascimento={nascimento} onChange={setNascimento} desabilitado={loading} obrigatorio={false} incorreto={setNascimentoIncorreto} limpar={limparValidacao}>
            </NascimentoField>
          </CCol> 

          <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
            <GeneroField
              genero={genero} onChange={setGenero} desabilitado={loading} obrigatorio={true}>
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
            <CRow className="row g-3">
              <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
                <ContatoField
                  contato={contato} onChange={setContato} desabilitado={loading} incorreto={setContatoIncorreto} limpar={limparValidacao}>
                </ContatoField>
              </CCol>
            </CRow>

            <CRow className="mt-5">
              <CCol xs={6} sm={5} md={5} lg={5} xl={5}>
                <CButton color="warning" onClick={Limpar}>Limpar</CButton>
              </CCol>
              <CCol xs={6} sm={5} md={5} lg={5} xl={5}>
                <CButton color="success" type="submit" disabled={hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto, contatoIncorreto])}>Salvar</CButton>
              </CCol>
            </CRow>
          </CCol>     
        </CRow>

      </CForm>
    </>
  );
};

export default CadastrarResponsavel;
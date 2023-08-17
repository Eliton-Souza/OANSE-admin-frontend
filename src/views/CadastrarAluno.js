import React, { useState, useRef } from 'react';
import { CButton, CForm, CCol, CRow, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { NascimentoField } from '../components/formulario/nascimento';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';
import { ManualField } from '../components/formulario/manual';

import { SaldoField } from '../components/widget/saldo';
import { ResponsavelField } from '../components/formulario/responsavel';
import { ClubeField } from '../components/widget/clube';
import { IdadeField } from 'src/components/widget/idade';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';

const CadastrarAluno = () => {

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

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

  const [limparValidacao, setLimparValidacao] = useState(false);
 

  const Limpar = () => {  //ver logica

    formRef.current.reset();
    
    setNome('');
    setSobrenome('');
    setGenero('');
    setNascimento(null);
    setManual({ id_manual: null, nome: '', clube: ''});
    setResponsavel({ id_responsavel: null, nome: '' });

    setLimparValidacao(true);
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };

  //corrigir alteraçãos no banco, nao ta salvando
  const salvarAlteracoes= async () => {

    setLoading(true);
    const result= await api.criarAluno( nome, sobrenome, genero, nascimento, responsavel.id_responsavel, manual.id_manual );
    setLoading(false);

    if(result.error){
      setSucesso({tipo: 'danger', menssagem: result.error});
    }else{
      setSucesso({tipo: 'success', menssagem: "Aluno cadastrado com sucesso"});
    }

    Limpar();

    setTimeout(() => {
      setSucesso({tipo: '', menssagem: ''});
    }, 5000); // 5 segundos
  }
 

  return (
    <>
      <h1 style={{ fontSize: '24px' }}>Novo Aluno
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
          <CCol xs={6} sm={5} md={5} lg={5} xl={5}>
            <NascimentoField
              nascimento={nascimento} onChange={setNascimento} desabilitado={loading} obrigatorio={false} incorreto={setNascimentoIncorreto} limpar={limparValidacao}>
            </NascimentoField>
          </CCol> 

          <CCol xs={6} sm={7} md={7} lg={7} xl={7}>
            <GeneroField
              genero={genero} onChange={setGenero} desabilitado={loading} obrigatorio={true}>
            </GeneroField>
          </CCol>
        </CRow>

        <CRow className="row g-3">
          <CCol xs={12} sm={6} md={6} lg={6} xl={6}>
            <ManualField
              manual={manual} onChange={setManual} desabilitado={loading} obrigatorio={true}>
            </ManualField>
          </CCol>
      
          <CCol xs={12} sm={5} md={5} lg={5} xl={6}>
            <ResponsavelField
              responsavel={responsavel} onChange={setResponsavel} desabilitado={loading} obrigatorio={false}>
            </ResponsavelField>
          </CCol>
        </CRow>

        <CRow className="row g-3"> 
          <CCol xs={4} sm={4} md={4} lg={4} xl={4}>
            <SaldoField
              saldo={0}>
            </SaldoField>
          </CCol>

          <CCol xs={4} sm={4} md={4} lg={4} xl={4}>
            <ClubeField
              clube={manual.clube}>
            </ClubeField>
          </CCol>

          <CCol xs={4} sm={4} md={4} lg={4} xl={4}>
            <IdadeField
              nascimento={nascimento}>
            </IdadeField>
          </CCol>
        </CRow>


        <CRow>
          <CCol xs={4}>
            <CButton color="warning" onClick={Limpar}>Limpar</CButton>
          </CCol>

          <CCol xs={4}>
            <CButton color="success" type="submit" disabled={ hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto])}>Salvar</CButton>
          </CCol>
        </CRow>
             
      </CForm>
    </>
  );
};

export default CadastrarAluno;
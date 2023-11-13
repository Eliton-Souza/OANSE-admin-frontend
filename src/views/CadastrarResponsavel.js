import React, { useState } from 'react';
import { CButton, CForm, CCol, CRow, CSpinner, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { api } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { Data } from '../components/formulario/data';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';
import { IdadeField } from 'src/components/widget/idade';

import { ContatoField } from 'src/components/formulario/contato';
import { ToastPersonalizado } from 'src/components/formulario/toast';

const CadastrarResponsavel = () => {

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
 
  const Limpar = () => {
    
    setNome('');
    setSobrenome('');
    setGenero('');
    setNascimento(null);
    setContato(null)
  
    setLimparValidacao(true);
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundo
  };


  const salvarAlteracoes= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result= await api.criarResponsavel( nome, sobrenome, genero, nascimento, contato );
    setLoading(false);

    if(result.error){
      setSucesso({tipo: 'danger', menssagem: result.error});
    }else{
      setSucesso({tipo: 'success', menssagem: `${nome} foi ${genero == 'M'? 'cadastrado' : 'cadastrada'} com sucesso`});
      Limpar();
    }  
  }
 

  return (
    <>
      {sucesso.tipo != '' && (           
        <ToastPersonalizado
          titulo={sucesso.tipo=='success'? 'SUCESSO!' : 'ERRO!'}
          menssagem={sucesso.menssagem}
          cor={sucesso.tipo=='success'? 'success' : 'danger'}>
        </ToastPersonalizado>
      )}

      <CCardHeader component="h1">Novo Responsável
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </CCardHeader>
      
      <CCard className='mt-4'>
        <CCardBody>
          <CForm className="row g-3">
            <CRow className="row g-2">
              <CCol xs={5}>
                <NomeField
                  nome={nome} onChange={setNome} desabilitado={loading} obrigatorio={true} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
                </NomeField>
              </CCol>

              <CCol xs={7}>
                <SobrenomeField
                  sobrenome={sobrenome} onChange={setSobrenome} desabilitado={loading} obrigatorio={true} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
                </SobrenomeField>
              </CCol>
            </CRow>

            <CRow className="row g-3">
              <CCol xs={5}>
                <Data
                  data={nascimento} onChange={setNascimento} desabilitado={loading} obrigatorio={false} incorreto={setNascimentoIncorreto} label={'Nascimento'} limpar={limparValidacao}>
                </Data>
              </CCol> 

              <CCol xs={7}>
                <GeneroField
                  genero={genero} onChange={setGenero} desabilitado={loading} obrigatorio={true}>
                </GeneroField>
              </CCol>
            </CRow>

            <CRow className="row g-3">
              <CCol xs={5}>
                <IdadeField
                  nascimento={nascimento}>
                </IdadeField>
              </CCol>

              <CCol xs={7}>
                <CRow className="row g-3">
                  <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
                    <ContatoField
                      contato={contato} onChange={setContato} desabilitado={loading} incorreto={setContatoIncorreto} limpar={limparValidacao} obrigatorio={false} label={'Telefone'}>
                    </ContatoField>
                  </CCol>
                </CRow>

                <CRow className="mt-5 text-end">
                  <CCol xs={12}>
                    <CButton
                      color="success"
                      onClick={salvarAlteracoes}
                      type="submit"
                      disabled={loading || nome=='' || sobrenome=='' || genero=='' ||
                      hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto, contatoIncorreto])}>
                      {loading? 'Salvando' : 'Salvar'}
                    </CButton>
                  </CCol>
                </CRow>
              </CCol>     
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CadastrarResponsavel;
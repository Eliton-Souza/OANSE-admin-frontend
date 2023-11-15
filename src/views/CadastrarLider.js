import React, { useState, useRef } from 'react';
import { CButton, CForm, CCol, CRow, CSpinner, CCard, CCardBody, CCardTitle, CCardHeader } from '@coreui/react';
import { api } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { Data } from '../components/formulario/data';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';
import { IdadeField } from 'src/components/widget/idade';

import { ContatoField } from 'src/components/formulario/contato';
import { ListarClubesFild } from 'src/components/formulario/listarClubes';
import { ClubeField } from 'src/components/widget/clube';
import { SenhaField } from 'src/components/formulario/senha';
import { ToastPersonalizado } from 'src/components/formulario/toast';

const CadastrarLider = () => {

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //dados
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [contato, setContato] = useState(null);
  const [senha, setSenha] = useState(null);
  const [clube, setClube] = useState( {id_clube: null, nome: ''});
 

  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);
  const [contatoIncorreto, setContatoIncorreto] = useState(false);
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);
 
  const Limpar = () => {  //ver logica
    
    setNome('');
    setSobrenome('');
    setGenero('');
    setNascimento(null);
    setClube({ id_clube: null, nome: ''});
    setContato(null);
    setSenha(null)
  
    setLimparValidacao(true);
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };


  const salvarAlteracoes= async () => {

    const login= contato.replace(/\D/g, '');
    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result= await api.criarLider(nome, sobrenome, genero, nascimento, clube.id_clube, login, senha);
    setLoading(false);

    if(result.error){
      setSucesso({tipo: 'danger', menssagem: result.error});
    }else{
      setSucesso({ tipo: 'success', menssagem: `${nome} foi ${genero == 'M'? 'cadastrado' : 'cadastrada'} com sucesso`});
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

      <CCardHeader component="h1">Novo Líder
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </CCardHeader>

        <CCard className='mt-4'>
          <CCardBody>
            <CForm className="row g-3">
              <CRow className="row g-2">
                <CCol xs={6}>
                  <NomeField
                    nome={nome} onChange={setNome} desabilitado={loading} obrigatorio={true} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
                  </NomeField>
                </CCol>

                <CCol xs={6}>
                  <SobrenomeField
                    sobrenome={sobrenome} onChange={setSobrenome} desabilitado={loading} obrigatorio={true} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
                  </SobrenomeField>
                </CCol>
              </CRow>

              <CRow className="row g-3">
                <CCol xs={12} sm={12} md={5} lg={6} xl={6}>
                  <Data
                    data={nascimento} onChange={setNascimento} desabilitado={loading} obrigatorio={false} incorreto={setNascimentoIncorreto} label={'Nascimento'} limpar={limparValidacao}>
                  </Data>
                </CCol> 

                <CCol xs={12} sm={12} md={4} lg={4} xl={4}>
                  <ListarClubesFild
                    clube={clube} onChange={setClube} desabilitado={loading} obrigatorio={true} todos={true}>
                  </ListarClubesFild>
                </CCol>

                <CCol xs={12} sm={12} md={3} lg={2} xl={2}>
                  <GeneroField
                    genero={genero} onChange={setGenero} desabilitado={loading} obrigatorio={true}>
                  </GeneroField>
                </CCol>                
              </CRow>             
              
             
              <CRow className="row g-3">           
                <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CCardTitle component="h6">Login
                    <span style={{ color: 'red' }}> *</span>
                  </CCardTitle>
                  <ContatoField
                    contato={contato} onChange={setContato} desabilitado={loading} incorreto={setContatoIncorreto} limpar={limparValidacao} obrigatorio={true}>
                  </ContatoField>
                </CCol>                                          
                  
                <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CCardTitle component="h6">Senha
                    <span style={{ color: 'red' }}> *</span>
                  </CCardTitle>            
                  <SenhaField
                    senha={senha} onChange={setSenha} desabilitado={loading} obrigatorio={true} incorreto={setSenhaIncorreta} limpar={limparValidacao} visivel={true}>
                  </SenhaField>
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

              <CRow className="mt-5 text-end">
                <CCol xs={12}>
                  <CButton
                    color="success"
                    onClick={salvarAlteracoes}
                    type="submit"
                    disabled={loading || nome=='' || sobrenome=='' || genero=='' || clube=='' || contato==null || senha== null ||
                    hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto, contatoIncorreto, senhaIncorreta])}>
                    {loading? 'Salvando' : 'Salvar'}
                  </CButton>
                </CCol>
              </CRow>

            </CForm>
          </CCardBody>
        </CCard>
    </>
  );
};

export default CadastrarLider;
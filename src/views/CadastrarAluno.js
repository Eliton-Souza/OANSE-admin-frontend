import React, { useState } from 'react';
import { CButton, CForm, CCol, CRow, CSpinner, CCard, CCardBody, CFormLabel, CCardHeader } from '@coreui/react';
import { api } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { SobrenomeField } from '../components/formulario/sobrenome';
import { Data } from '../components/formulario/data';
import { GeneroField } from '../components/formulario/genero';
import { hasCampoIncorreto, regexNamePessoa } from '../components/formulario/helper';
import { ManualField } from '../components/formulario/manual';

import { SaldoField } from '../components/widget/saldo';
import { IdadeField } from 'src/components/widget/idade';
import { SelectOansistas } from 'src/components/formulario/selectOansistas';
import { ToastPersonalizado } from 'src/components/formulario/toast';

const CadastrarAluno = () => {

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //dados
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [genero, setGenero] = useState('');
  const [manual, setManual] = useState({ id_manual: null, nome: '', clube: '' });
  const [responsavel, setResponsavel] = useState({ id_pessoa: null, nome: ''});


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [sobrenomeIncorreto, setSobrenomeIncorreto] = useState(false);
  const [nascimentoIncorreto, setNascimentoIncorreto] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);
 

  const Limpar = () => {  //ver logica
    
    setNome('');
    setSobrenome('');
    setGenero('');
    setNascimento(null);
    setManual({ id_manual: null, nome: '', clube: ''});
    setResponsavel({ id_pessoa: null, nome: '' });

    setLimparValidacao(true);
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };

  const salvarAlteracoes= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result= await api.criarAluno( nome, sobrenome, genero, nascimento, responsavel.id_pessoa, manual.id_manual );
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

      <CCardHeader component="h1">Novo Aluno
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </CCardHeader>


      <CCard className='mt-4'>
        <CCardBody>
          <CForm className="row g-3">
            
            <CRow className="row g-2">
              <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
                <NomeField
                  nome={nome} onChange={setNome} desabilitado={loading} obrigatorio={true} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNamePessoa}>
                </NomeField>
              </CCol>

              <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
                <SobrenomeField
                  sobrenome={sobrenome} onChange={setSobrenome} desabilitado={loading} obrigatorio={true} incorreto={setSobrenomeIncorreto} limpar={limparValidacao}>
                </SobrenomeField>
              </CCol>

              <CCol xs={12} sm={12} md={3} lg={3} xl={3} className="mx-md-3 mt-4 mt-md-2">
                <GeneroField
                  genero={genero} onChange={setGenero} desabilitado={loading} obrigatorio={true}>
                </GeneroField>
              </CCol>
            </CRow>

            <CRow className="row g-3">           
              <CCol xs={12} sm={12} md={4} lg={4} xl={4}>
                <Data
                  data={nascimento} onChange={setNascimento} desabilitado={loading} obrigatorio={false} incorreto={setNascimentoIncorreto} label={'Nascimento'} limpar={limparValidacao}>
                </Data>
              </CCol> 
          
              <CCol xs={12} sm={12} md={4} lg={4} xl={4}>
                <ManualField
                  manual={manual} onChange={setManual} desabilitado={loading} obrigatorio={true}>
                </ManualField>
              </CCol>
          
              <CCol xxs={12} sm={12} md={4} lg={4} xl={4}>
                <CFormLabel>Responsável</CFormLabel>
                  <SelectOansistas
                    pessoa={responsavel} onChange={setResponsavel} desabilitado={loading} obrigatorio={false}>                      
                  </SelectOansistas>            
              </CCol>
            </CRow>

            <CRow className="row g-3">             
              <CCol xs={6}>
                <IdadeField
                  nascimento={nascimento}>
                </IdadeField>
              </CCol>

              <CCol xs={6}>
                <SaldoField
                  saldo={0}>
                </SaldoField>
              </CCol>
            </CRow>

            <CRow className="mt-4 text-end">  
              <CCol xs={12}>
                <CButton
                  color="success"
                  onClick={salvarAlteracoes}
                  type="submit"
                  disabled={loading || nome=='' || sobrenome=='' || genero=='' || manual.id_manual== null ||
                  hasCampoIncorreto([nomeIncorreto, sobrenomeIncorreto, nascimentoIncorreto])}>
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

export default CadastrarAluno;
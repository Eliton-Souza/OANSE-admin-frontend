import React, { useState } from 'react';
import { CButton, CForm, CCol, CRow, CAlert, CSpinner, CCard, CCardBody } from '@coreui/react';
import { api } from 'src/services/api';

import { NomeField } from '../components/formulario/nome';
import { hasCampoIncorreto, regexNameMaterial, regexNumero } from '../components/formulario/helper';

import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';
import { PrecoMaterial } from 'src/components/formulario/PrecoMaterial';
import { QuantidadeFild } from 'src/components/formulario/quantidade';
import { ListarClubesFild } from 'src/components/formulario/listarClubes';

const CadastrarMaterial = () => {

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //dados
  const [nome, setNome] = useState('');
  const [clube, setClube] = useState( {id_clube: null, nome: ''});
  const [quantidade, setQuantidade] = useState();
  const [preco, setPreco] = useState();
 

  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [quantidadeIncorreta, setQuantidadeIncorreta] = useState(false);
  const [precoIncorreto, setPrecoIncorreto] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);
 
  const Limpar = () => {  //ver logica

    setNome('');
    setQuantidade();
    setClube({ id_clube: null, nome: ''});
    setPreco();
  
    setLimparValidacao(true);
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };


  const salvarAlteracoes= async () => {

    setLoading(true);
    const result= await api.criarMaterial(nome, clube.id_clube, quantidade, preco);
    setLoading(false);

    if(result.error){
      setSucesso({tipo: 'danger', menssagem: result.error});
    }else{
      setSucesso({tipo: 'success', menssagem: "Material cadastrado com sucesso"});
      Limpar();
    }

   

    setTimeout(() => {
      setSucesso({tipo: '', menssagem: ''});
    }, 2000); // 5 segundos
  }
 

  return (
    <>
      <h1>Novo Material
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

      <CCard className='mt-4'>
        <CCardBody>
          <CForm className="row g-3">
            <CRow className="row g-2">
              <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                <NomeField
                  nome={nome} onChange={setNome} desabilitado={loading} obrigatorio={true} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNameMaterial}>
                </NomeField>
              </CCol>

              <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                <ListarClubesFild
                  clube={clube} onChange={setClube} desabilitado={loading} obrigatorio={true} todos={false}>
                </ListarClubesFild>
              </CCol>
            </CRow>

            <CRow className="row g-2">
              <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                <QuantidadeFild
                  quantidade={quantidade} onChange={setQuantidade} desabilitado={loading} incorreto={setQuantidadeIncorreta} limpar={limparValidacao} regexQuantidade={regexNumero}>
                </QuantidadeFild>
              </CCol>

              <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                <PrecoMaterial
                  preco={preco} onChange={setPreco} desabilitado={loading} incorreto={setPrecoIncorreto} limpar={limparValidacao} regexPreco={regexNumero}>
                </PrecoMaterial>
              </CCol>
            </CRow>
          </CForm>
          <CRow className="mt-4 text-end">
            <CCol xs={12}>
              <CButton
                color="success"
                onClick={salvarAlteracoes}
                type="submit"
                disabled={loading || clube.id_clube== null || nome==='' || hasCampoIncorreto([nomeIncorreto, precoIncorreto, quantidadeIncorreta])}>
                {loading? 'Cadastrando' : 'Cadastrar'}
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CadastrarMaterial;
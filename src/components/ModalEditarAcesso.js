import { CButton, CCard, CCardBody, CCardTitle, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner } from "@coreui/react";
import { useState } from "react";
import { api } from "src/services/api";
import { ContatoField } from "./formulario/contato";
import { SenhaField } from "./formulario/senha";
import { hasCampoIncorreto } from "./formulario/helper";
import { useNavigate } from "react-router-dom";

export const ModalEditarAcesso = ({onChange, setSucesso }) => {

  const navigate= useNavigate();
 
  const [loading, setLoading] = useState(false);
  const [limparValidacao, setLimparValidacao] = useState(false);

  const [contatoIncorreto, setContatoIncorreto] = useState(false);
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);
  const [novoContatoIncorreto, setNovoContatoIncorreto] = useState(false);
  const [novaSenhaIncorreta, setNovaSenhaIncorreta] = useState(false);

  const [contato, setContato] = useState(null);
  const [senha, setSenha] = useState(null);
  const [novoContato, setNovoContato] = useState(null);
  const [novaSenha, setNovaSenha] = useState(null);


  const closeModal = () => {
    setLimparValidacao(true);
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos

    onChange(false);
  }

  const salvarAlteracoes= async () => {

    const login= contato.replace(/\D/g, '');
    const novoNogin= novoContato.replace(/\D/g, '');
    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result = await api.alterarAcesso(login, senha, novoNogin, novaSenha);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});

    } else {
      setSucesso({tipo: 'success', menssagem: `Você será redirecionado para a tela de login em instantes...`});
      closeModal();

      setTimeout(() => {
        navigate('/logout');
      }, 5000); // 5 segundos
    }    
  };
   
  return (
    <>
      <CModal alignment="top" visible={true} onClose={closeModal} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle component="h4">
            Alterar Dados de Acesso
          </CModalTitle>

          {loading && (
            <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
          )}
        </CModalHeader>

        <CModalBody>    
          <CCardTitle component="h5">Digite seu acesso atual</CCardTitle>  
          <CCard>          
            <CCardBody>
              <CRow className="row g-3">           
                <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CCardTitle component="h6">Login Atual
                    <span style={{ color: 'red' }}> *</span>
                  </CCardTitle>
                  <ContatoField
                    contato={contato} onChange={setContato} desabilitado={loading} incorreto={setContatoIncorreto} limpar={limparValidacao} obrigatorio={true}>
                  </ContatoField>
                </CCol>                                          
                  
                <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CCardTitle component="h6">Senha Atual
                    <span style={{ color: 'red' }}> *</span>
                  </CCardTitle>            
                  <SenhaField
                    senha={senha} onChange={setSenha} desabilitado={loading} obrigatorio={true} incorreto={setSenhaIncorreta} limpar={limparValidacao} visivel={false}>
                  </SenhaField>
                </CCol>                                            
            </CRow>
            </CCardBody>
          </CCard>

          <CCardTitle className="mt-4" component="h5">Digite seu novo acesso</CCardTitle>
          <CCard>          
            <CCardBody>
              <CRow className="row g-3">           
                <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CCardTitle component="h6">Novo Login
                    <span style={{ color: 'red' }}> *</span>
                  </CCardTitle>
                  <ContatoField
                    contato={novoContato} onChange={setNovoContato} desabilitado={loading} incorreto={setNovoContatoIncorreto} limpar={limparValidacao} obrigatorio={true}>
                  </ContatoField>
                </CCol>                                          
                  
                <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CCardTitle component="h6">Nova Senha
                    <span style={{ color: 'red' }}> *</span>
                  </CCardTitle>            
                  <SenhaField
                    senha={novaSenha} onChange={setNovaSenha} desabilitado={loading} obrigatorio={true} incorreto={setNovaSenhaIncorreta} limpar={limparValidacao} visivel={true}>
                  </SenhaField>
                </CCol>                                            
            </CRow>
            </CCardBody>
          </CCard>
          
        </CModalBody>

        <CModalFooter>

          <CRow className="d-flex align-items-center justify-content-end">
            <CCol xs={5} sm={5} md={5} lg={5} xl={5} className="me-3"> 
              <CButton
                color="secondary"
                onClick={closeModal}
                shape="rounded-pill"
              >
                Fechar
              </CButton>
            </CCol>
            <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
              <CButton
                disabled={loading || contato==null || senha== null || novoContato==null || novaSenha== null ||
                hasCampoIncorreto([contatoIncorreto, senhaIncorreta, novoContatoIncorreto, novaSenhaIncorreta])}
                color="success"
                onClick={salvarAlteracoes}
                type="submit"
                shape="rounded-pill"
              >
                {loading ? 'Salvando' : 'Salvar'}
              </CButton>
            </CCol>
          </CRow>
        </CModalFooter>

      </CModal>
    </>
  );
};
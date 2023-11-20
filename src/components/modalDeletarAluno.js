import { CButton, CCol, CForm, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner } from "@coreui/react";
import { useState } from "react";
import { api } from "src/services/api";


export const ModalDeletarAluno = ({ id_aluno, onChange, nome, setSucesso}) => {
 
  const [loading, setLoading] = useState(false);

  const [confirmarNome, setConfirmarNome] = useState('');

  const [modalAviso, setModalAviso] = useState(true);
  const [modalConfirmarNome, setModalSenha] = useState(false);

  const closeModal = () => {
    onChange(false);
  }

  const salvarAlteracoes= async () => {

    setSucesso({tipo: '', menssagem: ''});

    if(confirmarNome === nome){      

      setLoading(true);
      const result = await api.deletarAluno(id_aluno);
      setLoading(false);

      if (result.error) {
        setSucesso({tipo: 'danger', menssagem: result.error});

      } else {
        setSucesso({tipo: 'success', menssagem: "Aluno deletado com sucesso"});
        closeModal();
      }    
    }
    else{
      alert("Digite o nome do aluno corretamente");
    }
  };
   

  return (
    <>
      {loading && (
        <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
      )}

      {modalAviso && (
      
        <CModal alignment="top" visible={true} onClose={() => setModalAviso(false)} backdrop="static">
          <CModalHeader closeButton>
            <CModalTitle>
              Deletando Aluno
            </CModalTitle>
          </CModalHeader>

          <CModalBody>
            <p>
              Tem certeza que deseja apagar todos os registros associados ao aluno <strong>{nome}</strong>? 
            </p>
            <p>
              Esta ação incluirá a remoção da matrícula do aluno e todos os registros de transação relacionados ao saldo da sua carteira.
            </p>
          </CModalBody>

          <CModalFooter>
            <CRow className="d-flex align-items-center justify-content-end">
              <CCol xs={4} className="me-3"> 
                <CButton
                  color="secondary"
                  onClick={closeModal}
                  shape="rounded-pill"
                >
                  Fechar
                </CButton>
              </CCol>
              <CCol xs={7}>
                <CButton
                  disabled={loading}
                  color="danger"
                  onClick={() => { setModalSenha(true); setModalAviso(false);}}
                  type="submit"
                  shape="rounded-pill"
                >
                  Tenho certeza                
                </CButton>
              </CCol>
            </CRow>
          </CModalFooter>

        </CModal>
        )}

      {modalConfirmarNome && (
      
        <CModal alignment="top" visible={true} onClose={() => setModalSenha(false)} backdrop="static">
          <CModalHeader closeButton>
            <CModalTitle>
              Confirmar operação.
            </CModalTitle>
          </CModalHeader>

          <CModalBody>
            <p>
              Para confirmar a operação, por favor, digite exatamente o nome do aluno.
            </p>

            <CForm className="row g-3">
              <CRow className="row g-1">
                <CCol xs={12}>            
                  <CFormInput                   
                    placeholder="Digite o nome do aluno"
                    type="text"
                    id="nome"
                    onChange={(event) => setConfirmarNome(event.target.value)}
                    label={<span>Nome do aluno: <strong>{nome}</strong></span>}
                    required
                  />
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>

          <CModalFooter>
            <CRow className="d-flex align-items-center justify-content-end">
              <CCol xs={5} sm={5} md={5} lg={5} xl={5}> 
                <CButton
                  disabled={loading}
                  color="secondary"
                  onClick={closeModal}
                  shape="rounded-pill"
                >
                  Fechar
                </CButton>
              </CCol>
              <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
                <CButton
                  disabled={loading}
                  color="danger"
                  onClick={salvarAlteracoes}
                  type="submit"
                  shape="rounded-pill"
                  style={{ marginRight: '40px' }}
                >
                  {loading ? 'Deletando' : 'Confirmar'}
                </CButton>
              </CCol>
            </CRow>
          </CModalFooter>

        </CModal>
      )}
    </>
  );
};
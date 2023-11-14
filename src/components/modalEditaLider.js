import { CButton, CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner } from "@coreui/react";
import { useState } from "react";
import { api } from "src/services/api";
import { ListarClubesFild } from "./formulario/listarClubes";

export const ModalEditaLider = ({ id_lider, onChange, clube, setSucesso, nome, genero}) => {
 
  const [loading, setLoading] = useState(false);
  const [novoClube, setNovoClube] = useState(clube);


  const closeModal = () => {
    onChange(false);
  }

  const salvarAlteracoes= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result = await api.alterarClubeLíder(id_lider, novoClube.id_clube);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});

    } else {
      setSucesso({tipo: 'success', menssagem: `Clube ${genero == 'M'? 'do' : 'da'} ${nome} foi alterado com sucesso`});
      closeModal();
    }    
  };
   
  return (
    <>
      <CModal alignment="top" visible={true} onClose={closeModal} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>
            Atualizando Lider
          </CModalTitle>

          {loading && (
            <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
          )}
        </CModalHeader>

        <CModalBody>
          <CForm className="row g-3">
              <CCol xs={12}>        
                  <ListarClubesFild
                    clube={novoClube} onChange={setNovoClube} desabilitado={loading} obrigatorio={true} todos={true}>
                  </ListarClubesFild>
              </CCol>
          </CForm>
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
                disabled={novoClube=='' || loading}
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
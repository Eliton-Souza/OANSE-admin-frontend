import { cilCash, cilCheckCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CAlert, CButton, CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner, CWidgetStatsC } from "@coreui/react";
import { useState } from "react";
import { api } from "src/services/api";
import { ValorField } from "../formulario/valor";
import { TipoField } from "../formulario/tipoTransacao";


export const SaldoField = ({ saldo, id_carteira, id_aluno }) => {

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [valorIncorreto, setValorIncorreto] = useState(false);

  const [valor, setValor]= useState(0);
  const [tipo, setTipo]= useState('');
  const [descricao, setDescricao]= useState('');


  const handleClick = async () => {
    if (id_carteira) {
      setModalOpen(true);
    }
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const salvarAlteracoes= async () => {
    if(valor>0){
      setLoading(true);
      const result = await api.alterarSaldo(id_carteira, valor, tipo, id_aluno, "testando alteracao"  );
      setLoading(false);
  
      if (result.error) {
        setSucesso(false);
      } else {
        setSucesso(true);
      }
  
      setTimeout(() => {
        setSucesso();
      }, 2000); // 2 segundos
    }
    else{
      alert("Digite um númeo maior que 0");
    }
  };


  return (
    <>
      {loading && (
        <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
      )}

      <CWidgetStatsC
        className="mb-3"
        icon={<CIcon icon={cilCash} height={35} />}
        title="Saldo"
        value={saldo ? saldo : "0"}
        onClick={handleClick}
      />

      <CModal alignment="center" visible={modalOpen} onClose={closeModal} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>Alterar Saldo

          {sucesso && (
            <CAlert color="success" className="d-flex align-items-center">
              <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>Saldo atualizado com sucesso</div>
            </CAlert>
          )}

          </CModalTitle>
        </CModalHeader>
        <CModalBody>

        <CForm className="row g-3">
                <CRow className="row g-1">
                  <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
                    <ValorField
                      onChange={setValor} incorreto={setValorIncorreto}>
                    </ValorField>
                  </CCol>


                  <CCol className="col ms-5" xs={5} sm={5} md={5} lg={5} xl={5}>
                     <TipoField
                      onChange={setTipo}>
                     </TipoField>
                  </CCol>
                </CRow>

                <CRow className="row g-1">
                  <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
                    descricao
                  </CCol>
                </CRow>


              </CForm>
        </CModalBody>

        <CModalFooter>
          <CRow className="d-grid gap-2 d-md-flex justify-content-md-end">

            <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
              <CButton color="secondary" onClick={closeModal} shape="rounded-pill">Fechar</CButton>
            </CCol>

            <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
              <CButton color="success" onClick={salvarAlteracoes} type="submit" shape="rounded-pill">Salvar</CButton>
            </CCol>

          </CRow>

         
        
        </CModalFooter>
      </CModal>
    </>
  );
};
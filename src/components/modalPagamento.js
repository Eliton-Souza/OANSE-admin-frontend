import { cilCheckCircle, cilReportSlash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CAlert, CButton, CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner } from "@coreui/react";
import { useEffect, useState } from "react";
import { api } from "src/services/api";
import numeral from "numeral";
import { TipoPagamento } from "./formulario/tipoPagamento";
import { ValorField } from "./formulario/valor";


export const ModalPagamento = ({ id_venda, valor_restante, modalPag, onChange}) => {
 
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});
  const [block, setBlock] = useState(false);

  const [valorIncorreto, setValorIncorreto] = useState(false);

  const [valor_pago, setValorPago]= useState(0);
  const [novo_valor_restante, setNovoValorRestante]= useState(valor_restante);

  const [tipo, setTipo]= useState('Pix');

  const closeModal = () => {
    onChange(false);
  }

  useEffect(() => {
    const novoValor = parseFloat(valor_restante)- parseFloat(valor_pago);
    if(novoValor > 0){
      setNovoValorRestante(numeral(novoValor).format('0,0.00'));
    }
    else{
      setNovoValorRestante(0);
    }
  }, [valor_pago]);
  

  const salvarAlteracoes= async () => {

    setLoading(true);
    const result = await api.criarPagamento(id_venda, valor_pago, tipo);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});

      setTimeout(() => {
        setSucesso({tipo: '', menssagem: ''});
      }, 3000); // 3 segundos

    } else {
      setSucesso({tipo: 'success', menssagem: "Pagamento realizado com sucesso"});
      setBlock(true);

      setTimeout(() => {
        closeModal();
        setSucesso({tipo: '', menssagem: ''});
      }, 1500); // 1.5 segundos
    }
    
  };

  return (
    <>
      {loading && (
        <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
      )}

      <CModal alignment="top" visible={modalPag} onClose={closeModal} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>Pagamento

          {sucesso.tipo != '' && (
            <CAlert color={sucesso.tipo} className="d-flex align-items-center">
              <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{sucesso.menssagem}</div>
            </CAlert>
          )}

          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm className="row g-3">

            <CRow className="row g-1">
              <CCol xs={5} sm={5} md={5} lg={5} xl={5}>
                <ValorField
                  onChange={setValorPago} incorreto={setValorIncorreto}>
                </ValorField>
              </CCol>

              <CCol className="col ms-5" xs={5} sm={5} md={5} lg={5} xl={5}>
                <TipoPagamento
                  onChange={setTipo} tipo={tipo}>
                </TipoPagamento>
              </CCol>
            </CRow>

          </CForm>
        </CModalBody>

        <CModalFooter>
          {tipo && (
            <div className="d-flex align-items-center me-auto">
              Valor Restante: {novo_valor_restante}
            </div>
          )}
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
                disabled={valorIncorreto || !valor_pago || block}
                color="success"
                onClick={salvarAlteracoes}
                type="submit"
                shape="rounded-pill"
              >
                {loading ? 'Carregando' : 'Salvar'}
              </CButton>
            </CCol>
          </CRow>
        </CModalFooter>
      </CModal>
    </>
  );
};
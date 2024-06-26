import { CButton, CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner } from "@coreui/react";
import { useEffect, useState } from "react";
import { api } from "src/services/api";
import numeral from "numeral";
import { TipoPagamento } from "./formulario/tipoPagamento";
import { ValorField } from "./formulario/valor";
import { format } from "date-fns";
import { Data } from "./formulario/data";
import { ToastPersonalizado } from "./formulario/toast";


export const ModalPagamento = ({ id_venda, valor_restante, modalPag, onChange, sucesso, setSucesso}) => {
 
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);

  const [valorIncorreto, setValorIncorreto] = useState(false);
  const [dataIncorreta, setDataIncorreta] = useState(false);

  const [valor_pago, setValorPago]= useState(0);
  const [novo_valor_restante, setNovoValorRestante]= useState(valor_restante);

  const [tipo, setTipo]= useState('Pix');
  const [data, setData] = useState(format(new Date(), 'yyyy-MM-dd'));

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

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result = await api.criarPagamento(id_venda, valor_pago, tipo, data);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Pagamento realizado com sucesso"});
      setBlock(true);
     
      closeModal();
    }
    
  };

  return (
    <>
      {sucesso.tipo != '' && (           
        <ToastPersonalizado
          titulo={sucesso.tipo=='success'? 'SUCESSO!' : 'ERRO!'}
          menssagem={sucesso.menssagem}
          cor={sucesso.tipo=='success'? 'success' : 'danger'}>
        </ToastPersonalizado>
      )}

      {loading && (
        <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
      )}

      <CModal alignment="top" visible={modalPag} onClose={closeModal} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>
            Pagamento      
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
            
            <CRow className="row g-0 mt-4">           
              <CCol xs={5}>
                <Data
                  data={data} onChange={setData} desabilitado={false} obrigatorio={true} incorreto={setDataIncorreta} label={'Data *'} limpar={null}>
                </Data>
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
                disabled={valorIncorreto || dataIncorreta || !valor_pago || block}
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
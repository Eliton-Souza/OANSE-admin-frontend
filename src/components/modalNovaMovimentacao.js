import { CButton, CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner } from "@coreui/react";
import { useState } from "react";
import { api } from "src/services/api";
import { ValorField } from "./formulario/valor";
import { TipoField } from "./formulario/tipoTransacao";
import { DescricaoField } from "./formulario/descricao";
import { TipoPagamento } from "./formulario/tipoPagamento";
import { Data } from "./formulario/data";
import { SelectMotivo } from "./formulario/selectMotivo";
import { format } from "date-fns";


export const ModalMovimentacao = ({ modalCaixa, onChange, recarregar, setSucesso }) => {
 
  const [loading, setLoading] = useState(false);

  const [valor, setValor]= useState(0);
  const [tipo, setTipo]= useState('entrada');
  const [tipo_pag, setTipoPag]= useState('Pix');
  const [descricao, setDescricao]= useState(null);
  const [data, setData] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [motivo, setMotivo] = useState(null);

  const [valorIncorreto, setValorIncorreto] = useState(false);
  const [dataIncorreta, setDataIncorreta] = useState(false);
  const [block, setBlock] = useState(false);


  const closeModal = () => {
    onChange(false);
  }

  const salvarAlteracoes= async () => {

    setSucesso({tipo: '', menssagem: ''});

    setLoading(true);
    const result = await api.criarMovimentacao(valor, tipo, tipo_pag, descricao, data, motivo);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Movimentação inserida com sucesso"});
      recarregar(true);
      setBlock(true);

      closeModal();
    }    
  };
     

  return (
    <>
      {loading && (
        <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
      )}

      <CModal alignment="top" visible={modalCaixa} onClose={closeModal} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>
            Nova Movimentação
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm className="row g-3">

            <CRow className="row g-1">
              <CCol xs={5}>
                <ValorField
                  onChange={setValor} incorreto={setValorIncorreto}>
                </ValorField>
              </CCol>

              <CCol className="col ms-5" xs={5}>
                <TipoField
                  onChange={setTipo} tipo={tipo}>
                </TipoField>
              </CCol>
            </CRow>

            <CRow className="row g-0 mt-4">
              <CCol xs={5}>
                <Data
                  data={data} onChange={setData} desabilitado={false} obrigatorio={true} incorreto={setDataIncorreta} label={'Data *'} limpar={null}>
                </Data>
              </CCol> 

              <CCol className="col ms-5" xs={5}>
                <TipoPagamento
                  onChange={setTipoPag} tipo={tipo_pag}>
                </TipoPagamento>
              </CCol>
            </CRow>

            <CRow className="row g-0 mt-4">
              <CCol xs={12}>
                <SelectMotivo
                  setMotivo={setMotivo} desabilitado={false} tipo={tipo}>
                </SelectMotivo>
              </CCol>
            </CRow>

            <CRow className="row g-0 mt-4">
              <CCol xs={12}>
                <DescricaoField
                  onChange={setDescricao}>
                </DescricaoField>
              </CCol>
            </CRow>
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
                disabled={valorIncorreto || dataIncorreta || !valor || !data || !motivo || block}
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
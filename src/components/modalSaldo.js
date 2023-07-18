import { cilCheckCircle, cilReportSlash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CAlert, CButton, CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner, CWidgetStatsC } from "@coreui/react";
import { useState } from "react";
import { api } from "src/services/api";
import { ValorField } from "./formulario/valor";
import { TipoField } from "./formulario/tipoTransacao";
import numeral from "numeral";
import { DescricaoField } from "./formulario/descricao";


export const ModalSaldoField = ({ id_carteira, id_aluno, modalSaldo, onChange, saldo, nome}) => {
 
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});
  const [block, setBlock] = useState(false);

  const [valorIncorreto, setValorIncorreto] = useState(false);

  const [valor, setValor]= useState(0);
  const [tipo, setTipo]= useState('entrada');
  const [descricao, setDescricao]= useState(null);


  const closeModal = () => {
    onChange(false);
  }

  const salvarAlteracoes= async () => {

    setLoading(true);
    const result = await api.alterarSaldo(id_carteira, valor, tipo, id_aluno, descricao);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Saldo alterado com sucesso"});
      setBlock(true);

      setTimeout(() => {
        closeModal();
      }, 2000); // 2 segundos
    }

    setTimeout(() => {
      setSucesso({tipo: '', menssagem: ''});
    }, 3000); // 3 segundos
  };
   
  const handleSaldo = () => {
    if (tipo) {
      if (tipo === 'entrada') {
        const novoSaldo = parseFloat(saldo) + parseFloat(valor);
        return numeral(novoSaldo).format('0,0.00'); // Formata o número com separador de milhares e duas casas decimais
      } else {
        const novoSaldo = parseFloat(saldo) - parseFloat(valor);
        return numeral(novoSaldo).format('0,0.00'); // Formata o número com separador de milhares e duas casas decimais
      }
    } else {
      return saldo;
    }
  }
  

  return (
    <>
      {loading && (
        <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
      )}

      <CModal alignment="top" visible={modalSaldo} onClose={closeModal} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>{nome} - Saldo Atual: {numeral(saldo).format('0,0.00')}

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
                  onChange={setValor} incorreto={setValorIncorreto}>
                </ValorField>
              </CCol>

              <CCol className="col ms-5" xs={5} sm={5} md={5} lg={5} xl={5}>
                <TipoField
                  onChange={setTipo} tipo={tipo}>
                </TipoField>
              </CCol>
            </CRow>

            <CRow className="row g-0 mt-4">
              <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
                <DescricaoField
                  onChange={setDescricao}>
                </DescricaoField>
              </CCol>
            </CRow>

          </CForm>
        </CModalBody>

        <CModalFooter>
          {tipo && (
            <div className="d-flex align-items-center me-auto">
              Novo Saldo: {handleSaldo()}
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
                disabled={valorIncorreto || !valor || block}
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
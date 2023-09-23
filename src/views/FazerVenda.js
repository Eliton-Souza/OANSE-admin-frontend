import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CCol, CRow, CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CAlert, CSpinner, CCardFooter, CFormLabel } from '@coreui/react';
import { api } from 'src/services/api';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';
import { SelectOansistas } from 'src/components/formulario/selectOansistas';
import { DescricaoField } from 'src/components/formulario/descricao';
import { ModalPagamento } from 'src/components/modalPagamento';
import { format } from 'date-fns';
import { Data } from 'src/components/formulario/data';
import { ValorField } from 'src/components/formulario/valor';
import numeral from 'numeral';
import { EscolherClube } from 'src/components/formulario/selectClube';


const FazerVenda = () => {

  const [loading, setLoading] = useState();
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  const [materiais, setMateriais] = useState([]);
  const [materiaisClube, setMateriaisClube] = useState([]);

  //controle dos modais
  const [modalResumo, setModalResumo] = useState(false);
  const [modalPag, setModalPag] = useState(false);
  

  //dados
  const [id_venda, setIdVenda] = useState();
  const [pessoa, setPessoa] = useState({ id_pessoa: null, nome: '', id_clube: '' });
  const [materiaisSelecionados, setMateriaisSelecionados] = useState([]);

  const [descricao, setDescricao]= useState(null);
  const [valor_total, setValorTotal] = useState();
  const [valor_restante, setValorRestante] = useState();

  const [desconto, setDesconto]= useState(0);
  const [data, setData] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dataIncorreta, setDataIncorreta] = useState(false);
  const [valorIncorreto, setValorIncorreto] = useState(false);
  const [id_clube, setIdClube] = useState(null);


  const getMateriais = async () => {
    setLoading(true);
    const result = await api.listarMateriais();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setMateriais(result);
    }
  };

  useEffect(() => {
    getMateriais();
  }, []);


  useEffect(() => { 
    setMateriaisClube(materiais.filter(material => material.id_clube == id_clube));
  }, [id_clube]);
  


  useEffect(() => {
   setValorTotal(materiaisSelecionados.reduce((total, materialSelecionado) =>
   total + materialSelecionado.quantidade * materialSelecionado.valor_unit, 0))
  }, [materiaisSelecionados]);


  const salvarAlteracoes= async () => {
    setLoading(true);
    const result = await api.criarVenda(pessoa.id_pessoa, valor_total-desconto, descricao, data, materiaisSelecionados);   
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    }else {
      setSucesso({tipo: 'success', menssagem: "Venda registrada com sucesso"});

      setIdVenda(result.Venda);
      setValorRestante(valor_total);

      setTimeout(() => {
        setModalResumo(false);

        if((valor_total - desconto)>0){
          setModalPag(true);
        }

        setDesconto(0);
        setSucesso({tipo: '', menssagem: ''});
        setMateriaisSelecionados([]);
      }, 1000); // 1 segundo
    }
  };
  
     
    const handleIncrement = (id_material, valor_unitario) => {
      const materialIndex = materiaisSelecionados.findIndex(item => item.id_material === id_material);
  
      if (materialIndex !== -1) {
        const updatedMateriais = [...materiaisSelecionados];
        updatedMateriais[materialIndex].quantidade += 1;
        setMateriaisSelecionados(updatedMateriais);
      } else {
        setMateriaisSelecionados(prevMateriais => [
          ...prevMateriais,
          { id_material, quantidade: 1, valor_unit: valor_unitario }
        ]);
      }
    };
  
    const handleDecrement = (id_material) => {
      const materialIndex = materiaisSelecionados.findIndex(item => item.id_material === id_material);
    
      if (materialIndex !== -1) {
        const updatedMateriais = [...materiaisSelecionados];
    
        if (updatedMateriais[materialIndex].quantidade > 0) {
          updatedMateriais[materialIndex].quantidade -= 1;
    
          if (updatedMateriais[materialIndex].quantidade === 0) {
            updatedMateriais.splice(materialIndex, 1); // Remove o material da lista
          }
    
          setMateriaisSelecionados(updatedMateriais);
        }
      }
    };
  
  
  return (
    <>
      <h1>Fazer Venda
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </h1>

      <CRow className="row g-1">  
        <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
          <CRow className="row g-1">  
            <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
              <CCard className="mt-2">
              <CCardHeader component="h5">Responsável</CCardHeader>
                <CCardBody>
                  <CCol>                  
                    <SelectOansistas
                      pessoa={pessoa} onChange={setPessoa} desabilitado={false} obrigatorio={true}>                      
                    </SelectOansistas>
                  </CCol>
                  <CCol className='mt-4'>
                    <EscolherClube
                      onChange={setIdClube} clube={id_clube}>                    
                    </EscolherClube>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
              <CCard className="mt-3">
                <CCardHeader component="h5">Materiais</CCardHeader>
                <CCardBody>
                  <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Material</CTableHeaderCell>
                        <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Preço Unitário</CTableHeaderCell>
                        <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Quantidade</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {materiaisClube.map((material) => (
                        <CTableRow key={material.id_material}>      
                          <CTableDataCell>{material.nome}</CTableDataCell>
                          <CTableDataCell className="text-center">{material.preco}</CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CButton size="sm" color="warning" shape="rounded-circle" onClick={() => handleDecrement(material.id_material)}>-</CButton>
                            {' '}
                            {materiaisSelecionados.find(item => item.id_material === material.id_material)?.quantidade || 0}
                            {' '}
                            <CButton size="sm" color="success" shape="rounded-circle" onClick={() => handleIncrement(material.id_material, material.preco)}>+</CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>

        <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
          <CCard className="mt-2">
            <CCardHeader component="h5">Comanda</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" striped>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Material</CTableHeaderCell>
                    <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Preço Unitário</CTableHeaderCell>
                    <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Quantidade</CTableHeaderCell>
                    <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Total</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {materiaisSelecionados.map((materialSelecionado) => (
                    <CTableRow key={materialSelecionado.id_material} color="info">      
                      <CTableDataCell>{materiais.find(item => item.id_material === materialSelecionado.id_material)?.nome}</CTableDataCell>
                      <CTableDataCell className="text-center">{materialSelecionado.valor_unit}</CTableDataCell>
                      <CTableDataCell className="text-center">{materialSelecionado.quantidade}</CTableDataCell>
                      <CTableDataCell className="text-center">{materialSelecionado.quantidade * materialSelecionado.valor_unit}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol xs={4} sm={4} md={4} lg={4} xl={4} className="d-grid gap-2 d-md-flex">
                  <CButton color="warning" onClick={() => setMateriaisSelecionados([])}>Limpar</CButton>
                  <CButton color="success" onClick={() => setModalResumo(true)} disabled={materiaisSelecionados.length === 0}>Continuar</CButton>
                </CCol>

                <CCol className="mt-1 text-end" xs={8} sm={8} md={8} lg={8} xl={8}>
                  <CCardText component="h5">Total: {valor_total}</CCardText>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>



      <CModal alignment="center" scrollable visible={modalResumo==1} onClose={() => setModalResumo(false)} backdrop="static" size="lg" >
        <CModalHeader>
          <CModalTitle>Resumo de Pedido
          {sucesso.tipo != '' && (
            <CAlert color={sucesso.tipo} className="d-flex align-items-center">
              <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{sucesso.menssagem}</div>
            </CAlert>
          )}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>          
          <CCardTitle component="h5"> Responsável: {pessoa.nome}</CCardTitle>
          <CCardBody>
            <CTable align="middle" className="mt-3 border" striped>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Material</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Preço Unitário</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Quantidade</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {materiaisSelecionados.map((materialSelecionado) => (
                  <CTableRow key={materialSelecionado.id_material} color="info">      
                    <CTableDataCell>{materiais.find(item => item.id_material === materialSelecionado.id_material)?.nome}</CTableDataCell>
                    <CTableDataCell className="text-center">{materialSelecionado.valor_unit}</CTableDataCell>
                    <CTableDataCell className="text-center">{materialSelecionado.quantidade}</CTableDataCell>
                    <CTableDataCell className="text-center">{materialSelecionado.quantidade * materialSelecionado.valor_unit}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
              <CTableRow>
                <CTableHeaderCell colSpan={2} active></CTableHeaderCell>
                <CTableDataCell className="text-center">  <CCardText component="h5">Total</CCardText>  </CTableDataCell>
                <CTableDataCell className="text-center">  <CCardText component="h5">{numeral(valor_total - desconto).format('0,0.00')}</CCardText>  </CTableDataCell>
              </CTableRow>
            </CTable>
          </CCardBody>       
  
          <CRow>
            <CCol xs={6}>
              <CRow className="row g-0 mt-4">
                <CCol xs={12}>
                  <DescricaoField
                    onChange={setDescricao}>
                  </DescricaoField>
                </CCol>
              </CRow>
            </CCol>

            <CCol xs={6}>
              <CRow className="mt-3 justify-content-end">
                <CCol xs={10}>
                  <CFormLabel>Desconto</CFormLabel>
                  <ValorField
                    onChange={setDesconto} incorreto={setValorIncorreto}>
                  </ValorField>
                </CCol>
              </CRow>

              <CRow className="mt-3 justify-content-end">
                <CCol xs={10}>
                  <Data
                    data={data} onChange={setData} desabilitado={loading} obrigatorio={true} incorreto={setDataIncorreta} label={'Data *'} limpar={null}>
                  </Data>
                </CCol>
              </CRow>
            </CCol>
          </CRow>

        </CModalBody>
        <CModalFooter>
          <CRow>
            <CCol xs={6}>
              <CButton color="secondary" onClick={() => {
                  setModalResumo(false);
                  setDesconto(0);
                  }}
                >Fechar
              </CButton>
            </CCol>
            <CCol xs={6}>
              <CButton color="success" disabled={dataIncorreta || valorIncorreto} onClick={salvarAlteracoes} type="submit">{loading ? 'Salvando' : 'Finalizar'}</CButton>
            </CCol>
          </CRow>
        </CModalFooter>        
      </CModal>

      {modalPag &&(
          <ModalPagamento
            id_venda={id_venda} valor_restante={valor_restante} modalPag={modalPag} onChange={setModalPag}>
          </ModalPagamento>
      )}
      
    </>
  );
};

export default FazerVenda;
import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle, CForm, CCol, CRow, CCard, CCardBody, CAlert, CSpinner } from '@coreui/react';
import { api } from 'src/services/api';
import { NomeField } from '../components/formulario/nome';
import { hasCampoIncorreto, regexNameMaterial, regexNumero } from '../components/formulario/helper';


import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilReportSlash } from '@coreui/icons';
import { QuantidadeFild } from 'src/components/formulario/quantidade';
import { ListarClubesFild } from 'src/components/formulario/listarClubes';
import { PrecoMaterial } from 'src/components/formulario/PrecoMaterial';


const VerEstoque = () => {
  const [loading, setLoading] = useState();
  const [materiais, setMateriais] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [selectedMaterial, setSelectdMaterial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

  //formulario
  const [editar, setEditar] = useState(false);

  //dados
  const [nome, setNome] = useState('');
  const [clube, setClube] = useState( {id_clube: null, nome: ''});
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
 


  //verificar se os campos estão corretos:
  const [nomeIncorreto, setNomeIncorreto] = useState(false);
  const [quantidadeIncorreta, setQuantidadeIncorreta] = useState(false);

  const [limparValidacao, setLimparValidacao] = useState(false);


  const getDados = async () => {
    setLoading(true);
    const result = await api.listarMateriais();
    const resultClubes= await api.listarClubes();
    setLoading(false);

    if (result.error || resultClubes.error) {
      alert("Ocorreu um erro ao buscar dados");
    } else {
      setMateriais(result);
      setClubes(resultClubes.clubes);
    }
  };

  useEffect(() => {
    getDados();
  }, []);

  const openModal= async (id) => {
    setLoading(true);
    const material = await api.pegarMaterial(id);
    setLoading(false);

    setSelectdMaterial(material);
    setModalOpen(true);

    setDados(material);
  }

  const setDados=(dado)=>{
    setNome(dado.nome);
    setClube({id_clube: dado.id_clube, nome: dado.clube});
    setQuantidade(dado.quantidade);
    setPreco(dado.preco);
  }
   

  const closeModal = () => {
    setSelectdMaterial(null);
    setModalOpen(false);
    setEditar(false);
    setSucesso({tipo: '', menssagem: ''});
  };

  const salvarAlteracoes= async () => {
    setLoading(true);
    const result = await api.atualizarMaterial(selectedMaterial.id_material, nome, clube.id_clube, quantidade, preco);
    setLoading(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Material atualizado com sucesso"});
      getDados();   //melhorar no futuro

      setEditar(false);

      setTimeout(() => {
        closeModal();
        setSucesso({tipo: '', menssagem: ''});
      }, 1500); // 1.5 segundos
    }

    setLimparValidacao(true);
    
    setTimeout(() => {
      setLimparValidacao(false);
    }, 1000); // 1 segundos
  };

  return (
    <>
     <h1>Estoque de Materiais
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
     </h1>

      {clubes.map(clubeMap => (
        <div key={clubeMap.id_clube} className="mt-4">
          <h3>{clubeMap.nome}</h3>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
            <CCard className="mt-2">
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell className="col-xs-9 col-sm-9 col-md-6 col-lg-6 col-xl-6">Material</CTableHeaderCell>
                      <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-6 col-lg-6 col-xl-6">Estoque</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {materiais.filter(materialFilter => materialFilter.id_clube === clubeMap.id_clube).map(materialMap => (
                      <CTableRow key={materialMap.id_material} onClick={() => openModal(materialMap.id_material)}>      
                        <CTableDataCell>{materialMap.nome}</CTableDataCell>
                        <CTableDataCell className="text-center">{materialMap.quantidade}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
      ))}

      <CModal alignment="center" scrollable visible={modalOpen} onClose={closeModal} backdrop="static" size="lg" >
        <CModalHeader>
          <CModalTitle>{selectedMaterial && (selectedMaterial.nome)}
          {sucesso.tipo != '' && (
            <CAlert color={sucesso.tipo} className="d-flex align-items-center">
              <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{sucesso.menssagem}</div>
            </CAlert>
          )}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        
          {selectedMaterial && (
            <>
              <CForm className="row g-3">
                <CRow className="row g-2">
                  <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                    <NomeField
                      nome={nome} onChange={setNome} desabilitado={!editar} obrigatorio={false} incorreto={setNomeIncorreto} limpar={limparValidacao} regexName={regexNameMaterial}>
                    </NomeField>
                  </CCol>

                  <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                    <ListarClubesFild
                      clube={clube} onChange={setClube} desabilitado={!editar} obrigatorio={false}>
                    </ListarClubesFild>
                  </CCol>
                </CRow>

                <CRow className="row g-2">
                  <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                    <QuantidadeFild
                      quantidade={quantidade} onChange={setQuantidade} desabilitado={!editar} incorreto={setQuantidadeIncorreta} limpar={limparValidacao} regexQuantidade={regexNumero}>
                    </QuantidadeFild>
                  </CCol>

                  <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
                    <PrecoMaterial
                      preco={preco} onChange={setPreco} desabilitado={!editar} incorreto={setQuantidadeIncorreta} limpar={limparValidacao} regexPreco={regexNumero}>
                    </PrecoMaterial>
                  </CCol>
                </CRow>
              </CForm>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CRow>
            <CCol xs={4}>
              <CButton color="secondary" onClick={closeModal}>Fechar</CButton>
            </CCol>

            <CCol xs={4}>
              <CButton color="warning" onClick={() => setEditar(!editar)}>Editar</CButton>
            </CCol>

            <CCol xs={4}>
              <CButton color="success" onClick={salvarAlteracoes} type="submit" disabled={editar === false || hasCampoIncorreto([nomeIncorreto, quantidadeIncorreta])}>{loading ? 'Carregando' : 'Salvar'}</CButton>
            </CCol>
          </CRow>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VerEstoque;
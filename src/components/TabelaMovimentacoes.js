import { cilCheckCircle, cilReportSlash, cilSortAlphaDown, cilSortAlphaUp, cilSortNumericDown, cilSortNumericUp } from "@coreui/icons";
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CButton, CCard, CAlert, CSpinner, CCollapse, CListGroup, CListGroupItem, CCardBody, CCardFooter, CCardTitle, CTableFoot, CPopover } from '@coreui/react';
import React, { useState } from 'react';
import { api } from "src/services/api";
import { DescricaoField } from 'src/components/formulario/descricao';
import Paginacao from "./paginacao";
import CIcon from "@coreui/icons-react";
import numeral from "numeral";
import { ordena } from "src/views/helper";


export const TabelaMovimentacoes = ({ movimentacoes, onChange, tipo, total }) => {

  const [loading, setLoading] = useState();
  const [loadingSalvar, setLoadingSalvar] = useState();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});
  const [descricao, setDescricao] = useState('');
  const [movimentacaoAtual, setMovimentacaoAtual] = useState();
  const [ordemCrescente, setOrdemCrescente] = useState(true);

  const onClickRow= async (id) => {

    setSucesso({tipo: '', menssagem: ''});

    if (expandedRow === id) {
      setExpandedRow(null); // Fechar o collapse se a mesma linha for clicada novamente
    } else {
      setLoading(true);
      const movimentacao = await api.pegarMovimentacao(id);
      setLoading(false);

      setMovimentacaoAtual(movimentacao);
      setDescricao(movimentacao.descricao);

      setExpandedRow(id);
    }
    setCollapseOpen(!collapseOpen);
  }

  const salvarDescricao= async () => {

    setLoadingSalvar(true);
    const result = await api.atualizarDescricaoMovimentacao( movimentacaoAtual.id_movimentacao, descricao );
    setLoadingSalvar(false);

    if (result.error) {
      setSucesso({tipo: 'danger', menssagem: result.error});
    } else {
      setSucesso({tipo: 'success', menssagem: "Anotação atualizada com sucesso"});
     
      setTimeout(() => {
        setSucesso({tipo: '', menssagem: ''});
      }, 3000); // 3 segundos
    }
  };

 
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 15;
  const totalItems = movimentacoes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Lógica para obter a lista de movimentacoes a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const movimentacoesCorrentes = movimentacoes.slice(startIndex, endIndex);
  //movimentacoesCorrentes.reverse();

  return (
    <>
      <CCard className="mt-2">

        <CCardTitle style={{ paddingLeft: '20px', paddingTop: '20px' }} component="h3">
          {tipo} do Caixa
          {loading && (
            <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
          )}
        </CCardTitle>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell
                  onClick={() => onChange(ordena(movimentacoes, 'motivo', ordemCrescente),
                  setOrdemCrescente(!ordemCrescente))} className="col-sm-4">Motivo
                  <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                </CTableHeaderCell>
                <CTableHeaderCell
                  onClick={() => onChange(ordena(movimentacoes, 'nome_lider', ordemCrescente),
                  setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-4">Secretário
                  <CIcon icon={ordemCrescente ? cilSortAlphaDown : cilSortAlphaUp} size="lg"/>
                </CTableHeaderCell>
                <CTableHeaderCell
                  onClick={() => onChange(ordena(movimentacoes, 'data', ordemCrescente),
                  setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Data
                  <CIcon icon={ordemCrescente ? cilSortNumericDown : cilSortNumericUp} size="lg"/>
                </CTableHeaderCell>
                <CTableHeaderCell
                  onClick={() => onChange(ordena(movimentacoes, 'valor', ordemCrescente),
                  setOrdemCrescente(!ordemCrescente))} className="text-center col-sm-2">Valor
                  <CIcon icon={ordemCrescente ? cilSortNumericDown : cilSortNumericUp} size="lg"/>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {movimentacoesCorrentes.map((movimentacao) => (
                <React.Fragment key={movimentacao.id_movimentacao}>
                  <CTableRow key={movimentacao.id_movimentacao} onClick={() => onClickRow(movimentacao.id_movimentacao)}>
                    <CTableDataCell>{movimentacao.motivo}</CTableDataCell>
                    <CTableDataCell className="text-center">{movimentacao.nome_lider}</CTableDataCell>
                    <CTableDataCell className="text-center">{movimentacao.data.split('-').reverse().join('/')}</CTableDataCell>
                    <CTableDataCell className="text-center">{numeral(movimentacao.valor).format('0,0.00')}</CTableDataCell>                    
                  </CTableRow>
                  {expandedRow === movimentacao.id_movimentacao && (
                    <CCollapse visible={true}>
                      <CCard className="mt-3" style={{ width: '180%' }}>
                        <CListGroup>
                          <CListGroupItem>Secretário: {`${movimentacaoAtual.nome_lider} ${movimentacaoAtual.sobrenome_lider}`}</CListGroupItem>
                          <CListGroupItem>Tipo: {movimentacaoAtual.tipo_pag}</CListGroupItem>
                          <CListGroupItem> 

                            {loadingSalvar && (
                              <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
                            )}

                            <DescricaoField
                            onChange={setDescricao} descricao={descricao}
                            />
                            <CButton color="success" onClick={salvarDescricao}>{loadingSalvar ? 'Salvando' : 'Salvar Anotação'}</CButton>
                              
                            {sucesso.tipo != '' && (
                              <CAlert color={sucesso.tipo} className="d-flex align-items-center">
                                <CIcon icon={sucesso.tipo=='success'? cilCheckCircle : cilReportSlash} className="flex-shrink-0 me-2" width={24} height={24} />
                                <div>{sucesso.menssagem}</div>
                              </CAlert>
                            )}
                          </CListGroupItem>
                        </CListGroup>
                      </CCard>
                    </CCollapse>
                  )}
                </React.Fragment>
              ))}
              <CTableRow>
                <CTableHeaderCell colSpan={2} active></CTableHeaderCell>
                <CTableDataCell color= {tipo=='Entradas'? "success" : 'danger'} className="text-center">
                  <CPopover
                      content={`Quantidade de ${tipo} : ${total.quantidade}`}
                      placement="left">
                    <CButton color="link" variant="ghost">Total</CButton>
                  </CPopover>
                </CTableDataCell>
                <CTableDataCell color= {tipo=='Entradas'? "success" : 'danger'} className="text-center">{numeral(total.valor).format('0,0.00')}</CTableDataCell>
              </CTableRow>
            </CTableBody>           
          </CTable>
        </CCardBody>
        <CCardFooter>
          <Paginacao
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </CCardFooter>
      </CCard>
    </>
  );
};
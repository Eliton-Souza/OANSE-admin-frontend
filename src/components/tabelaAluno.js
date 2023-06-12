import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell } from '@coreui/react';
import { api } from 'src/services/api';
import { differenceInYears } from 'date-fns';
import Paginacao from './paginacao';

const TabelaAluno = () => {
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getAlunos = async () => {
    setLoading(true);
    const result = await api.pegarAlunos();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setAlunos(result.alunos);
    }
  };

  useEffect(() => {
    getAlunos();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Configurações da paginação
  const itemsPerPage = 10;
  const totalPages = Math.ceil(alunos.length / itemsPerPage);

  // Lógica para obter a lista de alunos a ser exibida na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlunos = alunos.slice(startIndex, endIndex);

  return (
    <>
      <CTable loading={loading.toString()} striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '75px' }}>Clube</CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '1px' }}>Idade</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentAlunos.map((aluno) => (
            <CTableRow key={aluno.id_aluno}>
              <CTableDataCell>{aluno.nome}</CTableDataCell>
              <CTableDataCell>{aluno.clube}</CTableDataCell>
              <CTableDataCell>{differenceInYears(new Date(), new Date(aluno.nascimento))}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <Paginacao
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default TabelaAluno;

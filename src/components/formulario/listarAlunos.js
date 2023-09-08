import React, { useEffect, useState } from 'react';
import { CFormSelect } from '@coreui/react';
import { api } from 'src/services/api';

export const ListarAlunosField = ({ aluno, onChange, desabilitado, obrigatorio }) => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.listarTodosAlunos();
        setAlunos(response.alunos);
      } catch (error) {
        alert(error);
      }
    };

    fetchAlunos();
  }, []);


  const handleAlunoChange = (novoAlunoId) => {
    const novoAluno = alunos.find((aluno) => aluno.id_aluno == novoAlunoId);
    onChange({ id_aluno: novoAluno?.id_aluno, nome: `${novoAluno?.nome} ${novoAluno?.sobrenome}`, id_clube: novoAluno?.id_clube });
  };

  // Agrupando os alunos por clube
  const alunosPorClube = alunos.reduce((grupos, aluno) => {
    if (!grupos[aluno.clube]) {
      grupos[aluno.clube] = [];
    }
    grupos[aluno.clube].push(aluno);
    return grupos;
  }, {});

  return (
    <>
      <CFormSelect
        onChange={(event) => {
          handleAlunoChange(event.target.value);
        }}
        disabled={desabilitado}
        required={obrigatorio}
        value={alunos.some((alunoItem) => alunoItem.id_aluno === aluno?.id_aluno) ? aluno.id_aluno : ''}>
         
        <option value='' disabled>Selecione um aluno</option>
        {Object.entries(alunosPorClube).map(([clube, alunosDoClube]) => (
          <React.Fragment key={clube}>
            <option disabled>───────────</option>
            <option disabled>{clube}</option>
            {alunosDoClube.map((alunoItem) => (
              <option key={alunoItem.id_aluno} value={alunoItem.id_aluno}>
                {alunoItem?.nome} {alunoItem?.sobrenome}

              </option>
            ))}
          </React.Fragment>
        ))}
      </CFormSelect>
    </>
  );
};
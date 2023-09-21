import React, { useEffect, useState } from 'react';
import { CFormSelect } from '@coreui/react';
import { api } from 'src/services/api';

export const SelectOansistas = ({ pessoa, onChange, desabilitado, obrigatorio }) => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const responseAlunos = await api.listarTodosAlunos();
        const responseLideres = await api.listarLideres();

        const listaPessoas = [...responseLideres.lideres, ...responseAlunos.alunos];        
        
        const listaPessoasOrdenadas = listaPessoas.sort((a, b) => a.id_clube - b.id_clube);    
        setPessoas(listaPessoasOrdenadas);
      } catch (error) {
        alert(error);
      }
    };
    fetchPessoas();
  }, []);

  


  const handlePessoaChange = (idNovaPessoa) => {
    const novaPessoa = pessoas.find((pessoa) => pessoa.id_pessoa == idNovaPessoa);
    onChange({ id_pessoa: novaPessoa?.id_pessoa, nome: `${novaPessoa?.nome} ${novaPessoa?.sobrenome}`, id_clube: novaPessoa?.id_clube });
  };

  // Agrupando os pessoas por clube
  const pessoasPorClube = pessoas.reduce((grupos, pessoa) => {
    if (!grupos[pessoa.clube]) {
      grupos[pessoa.clube] = [];
    }
    grupos[pessoa.clube].push(pessoa);
    return grupos;
  }, {});

  return (
    <>
      <CFormSelect
        onChange={(event) => {
          handlePessoaChange(event.target.value);
        }}
        disabled={desabilitado}
        required={obrigatorio}
        value={pessoas.some((pessoaItem) => pessoaItem.id_pessoa === pessoa?.id_pessoa) ? pessoa.id_pessoa : ''}>
         
        <option value='' disabled>Selecione um pessoa</option>
        {Object.entries(pessoasPorClube).map(([clube, pessoasDoClube]) => (
          <React.Fragment key={clube}>
            <option disabled>───────────</option>
            <option disabled>{clube}</option>
            {pessoasDoClube.map((pessoaItem) => (
              <option key={pessoaItem.id_pessoa} value={pessoaItem.id_pessoa}>
                {pessoaItem?.nome} {pessoaItem?.sobrenome}

              </option>
            ))}
          </React.Fragment>
        ))}
      </CFormSelect>
    </>
  );
};
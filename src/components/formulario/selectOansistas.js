import React, { useEffect, useState } from 'react';
import { CFormSelect, CFormLabel } from '@coreui/react';
import { api } from 'src/services/api';

export const SelectOansistas = ({ pessoa, onChange, desabilitado, obrigatorio }) => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const responsaveis = await api.listarResponsaveis();
        const lideres = await api.listarLideres();
  
        const listaPessoas = [...lideres, ...responsaveis];        
  
        const listaPessoasOrdenadas = listaPessoas.sort((a, b) => a.nome.localeCompare(b.nome));
        setPessoas(listaPessoasOrdenadas);
      } catch (error) {
        alert(error);
      }
    };
  
    fetchPessoas();
  }, []);
  

  const handlePessoaChange = (idNovaPessoa) => {
    const novaPessoa = pessoas.find((pessoa) => pessoa.id_pessoa == idNovaPessoa);
    onChange({ id_pessoa: novaPessoa?.id_pessoa, nome: `${novaPessoa?.nome} ${novaPessoa?.sobrenome}`});
  };

  return (
    <>
      <CFormLabel>Responsável</CFormLabel>
      <br />
      <CFormSelect
        onChange={(event) => {
          handlePessoaChange(event.target.value);
        }}
        disabled={desabilitado}
        required={obrigatorio}
        value={pessoas.some((pessoaItem) => pessoaItem.id_pessoa === pessoa?.id_pessoa) ? pessoa.id_pessoa : ''}>
        
        <option value={null}>Selecione um responsável</option>
        {pessoas.map((pessoaItem) => (
          <option
            key={pessoaItem.id_pessoa}
            value={pessoaItem.id_pessoa}
          >
            {`${pessoaItem.nome} ${pessoaItem.sobrenome}`}
          </option>
        ))}
      </CFormSelect>
    </>
  );
};
import React, { useEffect, useState } from 'react';
import { CFormSelect, CFormLabel } from '@coreui/react';
import { api } from 'src/services/api';

export const ResponsavelField = ({ responsavel, onChange, desabilitado, obrigatorio }) => {
  const [responsaveis, setResponsaveis] = useState([]);

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await api.listarResponsaveis();
        setResponsaveis(response.responsaveis);
      } catch (error) {
        alert(error);
      }
    };

    fetchResponsaveis();
  }, []);

  const handleResponsavelChange = (novoResponsavelId) => {
    const novoResponsavel = responsaveis.find((responsavel) => responsavel.id_responsavel == novoResponsavelId);
    onChange({ id_responsavel: novoResponsavel?.id_responsavel, nome: `${novoResponsavel?.nome} ${novoResponsavel?.sobrenome}` });
  };

  return (
    <>
      <CFormLabel>Responsável</CFormLabel>
      <br />
      <CFormSelect
        onChange={(event) => {
          handleResponsavelChange(event.target.value);
        }}
        disabled={desabilitado}
        required={obrigatorio}
        value={responsaveis.some((responsavelItem) => responsavelItem.id_responsavel === responsavel?.id_responsavel) ? responsavel.id_responsavel : ''}>
        
        <option value='' disabled>Selecione um responsável</option>
        {responsaveis.map((responsavelItem) => (
          <option
            key={responsavelItem.id_responsavel}
            value={responsavelItem.id_responsavel}
          >
            {`${responsavelItem.nome} ${responsavelItem.sobrenome}`}
          </option>
        ))}
      </CFormSelect>
    </>
  );
};
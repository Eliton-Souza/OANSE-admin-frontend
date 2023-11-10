import React, { useEffect, useState } from 'react';
import { CFormSelect, CFormLabel } from '@coreui/react';
import { api } from 'src/services/api';

export const ListarClubesFild = ({ clube, onChange, desabilitado, obrigatorio }) => {
  const [clubes, setClubes] = useState([]);

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await api.listarClubes();
        setClubes(response.clubes);
      } catch (error) {
        alert(error);
      }
    };

    fetchClubes();
  }, []);

  const handleClubeChange = (novoClubeId) => {
    const novoClube = clubes.find((clube) => clube.id_clube == novoClubeId);
    onChange({ id_clube: novoClube?.id_clube, nome: novoClube?.nome});
  };

  return (
    <>
      <CFormLabel>{obrigatorio? 'Clubes *': 'Clubes'}</CFormLabel>
      <br />
      <CFormSelect
        onChange={(event) => {
          handleClubeChange(event.target.value);
        }}
        disabled={desabilitado}
        required={obrigatorio}
        value={clubes.some((clubeItem) => clubeItem.id_clube === clube?.id_clube) ? clube.id_clube : ''}>
        
        <option value='' disabled>Selecione um Clube</option>
        {clubes.map((clubeItem) => (
          <option
            key={clubeItem.id_clube}
            value={clubeItem.id_clube}
          >
            {clubeItem.nome}
          </option>
        ))}
      </CFormSelect>
    </>
  );
};
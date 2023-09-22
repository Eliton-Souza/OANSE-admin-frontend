import React, { useEffect, useState } from 'react';
import { CFormSelect, CFormLabel } from '@coreui/react';

export const SelectMotivo = ({ setMotivo, desabilitado, tipo }) => {
  const [opcoes, setOpcoes] = useState([]);
  const [valorSelecionado, setValorSelecionado] = useState('');

  useEffect(() => {
    if (tipo === 'entrada') {
      setOpcoes(['Oferta', 'Repasse da Igreja', 'Outras']);
    } else {
      setOpcoes(['Compra de Materiais Oanse', 'Compra de Materias de Expediente', 'Lanche', 'Outras']);
    }
    setValorSelecionado('');
    setMotivo(null);
  }, [tipo]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setMotivo(selectedValue === '' ? null : selectedValue);
    setValorSelecionado(selectedValue);
  };

  return (
    <>
      <CFormLabel>Motivo *</CFormLabel>
      <CFormSelect
        disabled={desabilitado || tipo === null}
        required={true}
        onChange={handleSelectChange}
        value={valorSelecionado || ''}
      >
        <option value='' disabled>Selecione um motivo</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>
            {opcao}
          </option>
        ))}
      </CFormSelect>
    </>
  );
};

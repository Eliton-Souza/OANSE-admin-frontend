import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react';
import { useState } from 'react';

export const TipoField = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleTipoChange = (event) => {
    const novoTipo = event.target.value;
    setSelectedOption(novoTipo);
    onChange(novoTipo);
  };

  return (
    <>
    <CFormLabel>Tipo de Transação</CFormLabel>
      <br />
      <CRow className="row g-3 justify-content-md-end">
        <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
          <CFormCheck
            button={{ color: 'success', variant: 'outline' }}
            type="radio"
            name="options"
            id="success"
            label="Entrada"
            value="entrada"
            checked={selectedOption === 'entrada'}
            onChange={handleTipoChange}
            className={selectedOption === 'entrada' ? 'selected' : ''}
          />

        </CCol>

        <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
          <CFormCheck
            button={{ color: 'danger', variant: 'outline' }}
            type="radio"
            name="options"
            id="danger"
            label="Saída"
            value="saida"
            checked={selectedOption === 'saida'}
            onChange={handleTipoChange}
            className={selectedOption === 'saida' ? 'selected' : ''}
          />
        </CCol>
      </CRow>
    </>
  );
};

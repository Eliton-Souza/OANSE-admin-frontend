import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react';

export const TipoField = ({ onChange, tipo }) => {
  
  const handleTipoChange = (event) => {
    const novoTipo = event.target.value;
    onChange(novoTipo);
  };

  return (
    <>
    <CFormLabel>Tipo de Transação</CFormLabel>
      <br />
      <CRow className="row g-3 justify-content-md-end">
        <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
          <CFormCheck
            inline
            type="radio"
            name="options"
            id="success"
            label="Entrada"
            value="entrada"
            checked={tipo === 'entrada'}
            onChange={handleTipoChange}
            required= {true}
          />
        </CCol>

        <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
          <CFormCheck
            inline
            type="radio"
            name="options"
            id="danger"
            label="Saída"
            value="saida"
            checked={tipo === 'saida'}
            onChange={handleTipoChange}
            required= {true}
          />
        </CCol>
      </CRow>
    </>
  );
};

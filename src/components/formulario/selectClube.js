import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react';

export const EscolherClube = ({ onChange, clube }) => {
  
  const handleClubeChange = (event) => {
    const novoClube = event.target.value;
    onChange(novoClube);
  };

  return (
    <>
    <CFormLabel>Escolha um Clube</CFormLabel>
      <br />
      <CRow className="row g-3">
        <CCol xs={4}>
          <CFormCheck
            inline
            type="radio"
            name="optionsT"
            id="ursinho"
            label="Ursinho"
            value="1"
            checked={clube === '1'}
            onChange={handleClubeChange}
            required= {true}
          />
        </CCol>

        <CCol xs={4}>
          <CFormCheck
            inline
            type="radio"
            name="optionsT"
            id="faisca"
            label="Faísca"
            value="2"
            checked={clube === '2'}
            onChange={handleClubeChange}
            required= {true}
          />
        </CCol>

        <CCol xs={4}>
          <CFormCheck
            inline
            type="radio"
            name="optionsT"
            id="flama"
            label="Flama"
            value="3"
            checked={clube === '3'}
            onChange={handleClubeChange}
            required= {true}
          />
        </CCol>
      </CRow>


      <CRow className="row g-3">
        <CCol xs={4}>
          <CFormCheck
            inline
            type="radio"
            name="optionsT"
            id="tocha"
            label="Tocha"
            value="4"
            checked={clube === '4'}
            onChange={handleClubeChange}
            required= {true}
          />
        </CCol>

        <CCol xs={4}>
          <CFormCheck
            inline
            type="radio"
            name="optionsT"
            id="jv"
            label="JV"
            value="5"
            checked={clube === '5'}
            onChange={handleClubeChange}
            required= {true}
          />
        </CCol>

        <CCol xs={4}>
          <CFormCheck
            inline
            type="radio"
            name="optionsT"
            id="vq7"
            label="VQ7"
            value="6"
            checked={clube === '6'}
            onChange={handleClubeChange}
            required= {true}
          />
        </CCol>
      </CRow>
    </>
  );
};

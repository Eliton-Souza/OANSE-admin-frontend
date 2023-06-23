import React, { useEffect, useState } from 'react';
import { CFormSelect, CFormLabel } from '@coreui/react';
import { api } from 'src/services/api';

export const ManualField = ({ manual, onChange, desabilitado, obrigatorio }) => {
  const [manuais, setManuais] = useState([]);

  useEffect(() => {
    const fetchManuais = async () => {
      try {
        const response = await api.listarManuais();
        setManuais(response.manuais);
      } catch (error) {
        console.log(error);
      }
    };

    fetchManuais();
  }, []);


  const handleManualChange = (novoManualId) => {
    const novoManual = manuais.find((manual) => manual.id_manual == novoManualId);
    onChange({ id_manual: novoManual.id_manual, nome: novoManual.nome, clube: novoManual.clube });
  };

  // Agrupando os manuais por clube
  const manuaisPorClube = manuais.reduce((grupos, manual) => {
    if (!grupos[manual.clube]) {
      grupos[manual.clube] = [];
    }
    grupos[manual.clube].push(manual);
    return grupos;
  }, {});

  return (
    <>
      <CFormLabel> {obrigatorio? "Manual *" : "Manual"}</CFormLabel>
      <br />
      <CFormSelect
        onChange={(event) => {
          handleManualChange(event.target.value);
        }}
        disabled={desabilitado}
        required={obrigatorio}
        value={manuais.some((manualItem) => manualItem.id_manual === manual?.id_manual) ? manual.id_manual : ''}>
         
        <option value='' disabled>Selecione um manual</option>
        {Object.entries(manuaisPorClube).map(([clube, manuaisDoClube]) => (
          <React.Fragment key={clube}>
            <option disabled>───────────</option>
            <option disabled>{clube}</option>
            {manuaisDoClube.map((manualItem) => (
              <option key={manualItem.id_manual} value={manualItem.id_manual}>
                {manualItem.nome}
              </option>
            ))}
          </React.Fragment>
        ))}
      </CFormSelect>
    </>
  );
};
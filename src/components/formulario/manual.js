import React, { useEffect, useState } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CDropdownHeader, CFormLabel } from '@coreui/react';
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

  const handleManualChange = (novoManual) => {
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
      <CFormLabel>Manual</CFormLabel>
      <br />
      <CDropdown variant="btn-group">
        <CDropdownToggle color="light" disabled={desabilitado}>
          {manual ? manual : 'Selecione o Manual'}
        </CDropdownToggle>
        <CDropdownMenu>
          {Object.entries(manuaisPorClube).map(([clube, manuaisDoClube]) => (
            <React.Fragment key={clube}>
              <CDropdownHeader className="bg-light fw-semibold py-2">{clube}</CDropdownHeader>
              {manuaisDoClube.map((manualItem) => (
                <CDropdownItem
                  key={manualItem.id_manual}
                  value={manualItem.id_manual}
                  onClick={() => handleManualChange(manualItem)}
                  
                  required={obrigatorio}
                >
                  {manualItem.nome}
                </CDropdownItem>
              ))}
            </React.Fragment>
          ))}
        </CDropdownMenu>
      </CDropdown>
    </>
  );
};

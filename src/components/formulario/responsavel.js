import React, { useEffect, useState } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormLabel } from '@coreui/react';
import { api } from 'src/services/api';

export const ResponsavelField = ({ responsavel, onChange, desabilitado, obrigatorio }) => {
  const [responsaveis, setResponsaveis] = useState([]);

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await api.listarResponsaveis();
        setResponsaveis(response.responsaveis);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResponsaveis();
  }, []);

  const handleResponsavelChange = (novoResponsavel) => {
    onChange({ id_responsavel: novoResponsavel.id_responsavel, nome: `${novoResponsavel.nome} ${novoResponsavel.sobrenome}` });
  };

  return (
    <>
      <CFormLabel>Responsável</CFormLabel>
      <br />
      <CDropdown variant="btn-group">
        <CDropdownToggle color="light" disabled={desabilitado}>
          {responsavel ? responsavel : 'Selecione um responsável'}
        </CDropdownToggle>
        <CDropdownMenu>
          {responsaveis.map((responsavelItem) => (
            <CDropdownItem
              key={responsavelItem.id_responsavel}
              value={responsavelItem.id_responsavel}
              onClick={() => handleResponsavelChange(responsavelItem)}
              required={obrigatorio}
            >
              {`${responsavelItem.nome} ${responsavelItem.sobrenome}`}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    </>
  );
};

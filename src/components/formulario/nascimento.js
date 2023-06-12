import { CFormInput } from '@coreui/react';
import { useState } from 'react';
import { regexLastName } from './helper';

export const SobrenomeField = ({ sobrenome, onChange, desabilitado, obrigatorio }) => {
  const [valido, setValido] = useState(false);
  const [invalido, setInvalido] = useState(false);

  const handleSobrenomeChange = (event) => {
    const novoSobrenome = event.target.value;

    if (regexLastName.test(novoSobrenome)) {
      setValido(true);
      setInvalido(false);
    } else {
      setValido(false);
      setInvalido(true);
    }

    onChange(novoSobrenome); // Atualiza a variável sobrenome no componente pai
  };

  return (
    <>
      <CFormInput
        type="text"
        id="sobrenome"
        label="Sobrenome"
        defaultValue={sobrenome}
        onChange={handleSobrenomeChange}
        disabled={desabilitado}
        required={obrigatorio}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Apenas letras"
        feedbackValid="OK"
      />
    </>
  );
};

import { CFormInput } from '@coreui/react';
import { useState } from 'react';
import { regexName } from './helper';

export const NomeField = ({ nome, onChange, desabilitado, obrigatorio }) => {
  const [valido, setValido] = useState(false);
  const [invalido, setInvalido] = useState(false);

  const handleNomeChange = (event) => {
    const novoNome = event.target.value;

    if (regexName.test(novoNome)) {
      setValido(true);
      setInvalido(false);
    } else {
      setValido(false);
      setInvalido(true);
    }

    onChange(novoNome); // Atualiza a variável nome no componente pai
  };

  return (
    <>
      <CFormInput
        type="text"
        id="nome"
        label="Nome"
        defaultValue={nome}
        onChange={handleNomeChange}
        disabled={desabilitado}
        required={obrigatorio}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Apenas letras sem espaços"
        feedbackValid="OK"
      />
    </>
  );
};

import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import { regexLastName } from './helper';

export const SobrenomeField = ({ sobrenome, onChange, desabilitado, obrigatorio, incorreto, limpar }) => {

  const [valido, setValido] = useState(false);
  const [invalido, setInvalido] = useState(false);

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);

  const handleSobrenomeChange = (event) => {
    const novoSobrenome = event.target.value;

    if (regexLastName.test(novoSobrenome)) {
      setValido(true);
      setInvalido(false);
      incorreto(false);
      onChange(novoSobrenome); // Atualiza a variável sobrenome no componente pai
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
    }
  };

  return (
    <>
      <CFormInput
        placeholder="Sobrenome"
        type="text"
        id="sobrenome"
        label={obrigatorio? "Sobrenome *" : "Sobrenome"}
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

//prop opcional
SobrenomeField.defaultProps = {
  limpar: undefined
};
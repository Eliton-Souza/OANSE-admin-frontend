import { CFormInput } from '@coreui/react';
import { useState } from 'react';
import { regexNumber } from './helper';

export const ValorField = ({ onChange, incorreto }) => {

  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  const handleValorChange = (event) => {
    const novoValor = event.target.value;

    if (regexNumber.test(novoValor)) {
      setValido(true);
      setInvalido(false);  
      incorreto(false);
      onChange(novoValor); // Atualiza a variável valor no componente pai
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
    }
  };

  return (
    <>
      <CFormInput
        placeholder="Valor"
        type="text"
        id="valor"
        label= "Digite um valor"
        onChange={handleValorChange}
        disabled={false}
        required={true}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Apenas numeros ou ponto"
        feedbackValid="OK"
      />
    </>
  );
};


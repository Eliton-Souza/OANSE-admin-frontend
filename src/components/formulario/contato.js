import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import { regexPhoneNumber } from './helper';

export const ContatoField = ({ contato, onChange, desabilitado, incorreto, limpar }) => {

  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);

  const handleContatoChange = (event) => {
    const novoPhone = event.target.value;

    if (regexPhoneNumber.test(novoPhone)) {
      setValido(true);
      setInvalido(false);  
      incorreto(false);
      onChange(novoPhone); // Atualiza a variável contato no componente pai
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
    }
  };

  return (
    <>
      <CFormInput
        placeholder="(XX) X XXXX-XXXX"
        type="text"
        id="contato"
        label= "Telefone"
        defaultValue={contato}
        onChange={handleContatoChange}
        disabled={desabilitado}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Digite 11 números"
        feedbackValid="OK"
      />
    </>
  );
};

//prop opcional
ContatoField.defaultProps = {
  limpar: undefined
};
import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import { regexName } from './helper';

export const NomeField = ({ nome, onChange, desabilitado, obrigatorio, incorreto, limpar }) => {

  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);

  const handleNomeChange = (event) => {
    const novoNome = event.target.value;

    if (regexName.test(novoNome)) {
      setValido(true);
      setInvalido(false);  
      incorreto(false);
      onChange(novoNome); // Atualiza a variável nome no componente pai
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
    }
  };

  return (
    <>
      <CFormInput
        placeholder="Nome"
        type="text"
        id="nome"
        label={obrigatorio? "Nome *" : "Nome"}
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

//prop opcional
NomeField.defaultProps = {
  limpar: undefined
};
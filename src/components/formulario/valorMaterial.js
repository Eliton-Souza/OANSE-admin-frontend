import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';

export const ValorMaterial = ({ valor, onChange, desabilitado, incorreto, limpar, regexValor }) => {

  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);

  const handleValorChange = (event) => {
    const novoValor = event.target.value;

    if (regexValor.restricao.test(novoValor)) {
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
        type="text"
        id="valor"
        label= "Valor"
        defaultValue={valor}
        onChange={handleValorChange}
        disabled={desabilitado}
        valid={valido}
        invalid={invalido}
        feedbackInvalid={regexValor.feedbackInvalido}
        feedbackValid="OK"
      />
    </>
  );
};

//prop opcional
ValorMaterial.defaultProps = {
  limpar: undefined
};
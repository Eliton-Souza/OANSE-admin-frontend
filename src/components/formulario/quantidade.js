import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';

export const QuantidadeFild = ({ quantidade, onChange, desabilitado, incorreto, limpar, regexQuantidade }) => {

  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);

  const handleQuantidadeChange = (event) => {
    const novaQtd = event.target.value;

    if (regexQuantidade.restricao.test(novaQtd)) {
      setValido(true);
      setInvalido(false);  
      incorreto(false);
      onChange(novaQtd); // Atualiza a variável quantidade no componente pai
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
    }
  };

  return (
    <>
      <CFormInput
        key={limpar}
        placeholder='Escolha a quantidade'
        type="number"
        id="quantidade"
        label= "Estoque"
        defaultValue={quantidade}
        onChange={handleQuantidadeChange}
        disabled={desabilitado}
        valid={valido}
        invalid={invalido}
        feedbackInvalid={regexQuantidade.feedbackInvalido}
        feedbackValid="OK"
      />
    </>
  );
};

//prop opcional
QuantidadeFild.defaultProps = {
  limpar: undefined
};
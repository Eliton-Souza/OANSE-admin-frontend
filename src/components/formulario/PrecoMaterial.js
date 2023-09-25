import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';

export const PrecoMaterial = ({ preco, onChange, desabilitado, incorreto, limpar, regexPreco }) => {

  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);

  const handleValorChange = (event) => {
    const novoPreco = event.target.value;

    if (regexPreco.restricao.test(novoPreco)) {
      setValido(true);
      setInvalido(false);  
      incorreto(false);
      onChange(novoPreco); // Atualiza a variável preco no componente pai
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
        placeholder='Digite um Valor'
        type="number"
        id="preco"
        label= "Preço Unitário"
        defaultValue={preco}
        onChange={handleValorChange}
        disabled={desabilitado}
        valid={valido}
        invalid={invalido}
        feedbackInvalid={regexPreco.feedbackInvalido}
        feedbackValid="OK"
      />
    </>
  );
};

//prop opcional
PrecoMaterial.defaultProps = {
  limpar: undefined
};
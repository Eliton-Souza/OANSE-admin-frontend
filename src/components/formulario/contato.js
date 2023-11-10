import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import { regexPhoneNumber } from './helper';
import { IMaskMixin } from 'react-imask';

export const ContatoField = ({ contato, onChange, desabilitado, incorreto, limpar, obrigatorio, label }) => {
  
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

  const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
    <CFormInput {...props} ref={inputRef} />
  ));

  return (
    <>
      <CFormInputWithMask
        mask="(00) 00000-0000"
        placeholder="(XX) XXXXX-XXXX"
        type="text"
        id="contato"
        label= {label}
        defaultValue={contato}
        onAccept={(value) => handleContatoChange({ target: { value } })}
        disabled={desabilitado}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Digite 11 números"
        feedbackValid="OK"
        required= {obrigatorio}
      />
    </>
  );
};

// prop opcional
ContatoField.defaultProps = {
  limpar: undefined
};
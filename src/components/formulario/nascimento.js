import { CFormInput } from '@coreui/react';
import { useState } from 'react';
import moment from 'moment-timezone';

export const NascimentoField = ({ nascimento, onChange, desabilitado, obrigatorio, incorreto }) => {
  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  const currentDate = moment().tz('America/Manaus').format('YYYY-MM-DD');
 
  const handleNascimentoChange = (event) => {
    const novoNascimento = event.target.value

    if ( novoNascimento <= currentDate) {
      setValido(true);
      setInvalido(false);
      onChange(novoNascimento); // Atualiza a variável nascimento no componente pai
      incorreto(false);
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
      onChange(null);
    }

  };

  return (
    <>
      <CFormInput
        type="date"
        id="nascimento"
        label="Nascimento"
        defaultValue={nascimento}
        onChange={handleNascimentoChange}
        disabled={desabilitado}
        required={obrigatorio}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Data inválida"
        feedbackValid="OK"
      />
    </>
  );
};

import { CFormInput } from '@coreui/react';
import { useState } from 'react';
import moment from 'moment-timezone';

export const NascimentoField = ({ nascimento, onChange, desabilitado, obrigatorio }) => {
  const [valido, setValido] = useState(false);
  const [invalido, setInvalido] = useState(false);

  const currentDate = moment().tz('America/Manaus').format('YYYY-MM-DD');
  const selectedDate = moment(nascimento).format('DD-MM-YYYY');

  const handleNascimentoChange = (event) => {
    const novoNascimento = moment(event.target.value).format('YYYY-MM-DD');

    if ( novoNascimento <= currentDate) {
      setValido(true);
      setInvalido(false);
    } else {
      setValido(false);
      setInvalido(true);
    }

    onChange(moment(novoNascimento).format('DD-MM-YYYY')); // Atualiza a variável nascimento no componente pai
  };

  return (
    <>
      <CFormInput
        type="date"
        id="nascimento"
        label="Nascimento"
        defaultValue={selectedDate}
        onChange={handleNascimentoChange}
        disabled={desabilitado}
        required={obrigatorio}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Mlk nasceu no futur?"
        feedbackValid="OK"
      />
    </>
  );
};

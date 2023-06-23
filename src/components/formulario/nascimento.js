import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export const NascimentoField = ({ nascimento, onChange, desabilitado, obrigatorio, incorreto, limpar }) => {
  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  const currentDate = moment().tz('America/Manaus').format('YYYY-MM-DD');

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);
 
  const handleNascimentoChange = (event) => {
    let novoNascimento;
    event.target.value== ''? novoNascimento= null : novoNascimento = event.target.value;

    if (novoNascimento <= currentDate || novoNascimento== null) {
      setValido(true);
      setInvalido(false);
      incorreto(false);
      onChange(novoNascimento); // Atualiza a variável nascimento no componente pai
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
    }
  };

  return (
    <CFormInput
      placeholder="dd/mm/aaaa"
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
  );
};

//prop opcional
NascimentoField.defaultProps = {
  limpar: undefined
};
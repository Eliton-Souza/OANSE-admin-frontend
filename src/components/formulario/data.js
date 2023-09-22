import { CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export const Data = ({ data, onChange, desabilitado, obrigatorio, incorreto, label, limpar }) => {
  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();

  const currentDate = moment().tz('America/Manaus').format('YYYY-MM-DD');

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);
 
  const handleData = (event) => {
    let novaData;
    event.target.value== ''? novaData= null : novaData = event.target.value;

    if (novaData <= currentDate || novaData== null) {
      setValido(true);
      setInvalido(false);
      incorreto(false);
      onChange(novaData); // Atualiza a variável data no componente pai
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
      id="data"
      label={label}
      defaultValue={data}
      onChange={handleData}
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
Data.defaultProps = {
  limpar: undefined
};
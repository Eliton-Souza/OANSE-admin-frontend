import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react';
import { useEffect, useState } from 'react';
import { regexSenha } from './helper';
import { cilTouchApp } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export const SenhaField = ({ senha, onChange, desabilitado, obrigatorio, incorreto, limpar, visivel}) => {

  const [valido, setValido] = useState();
  const [invalido, setInvalido] = useState();
  const [senhaVisivel, setSenhaVisivel] = useState(visivel);

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  useEffect(() => {
    if (limpar) {
      setValido();
      setInvalido();
    }
  }, [limpar]);

  const handleSenhaChange = (event) => {
    const novaSenha = event.target.value;

    if (regexSenha.test(novaSenha)) {
      setValido(true);
      setInvalido(false);  
      incorreto(false);
      onChange(novaSenha); // Atualiza a variável senha no componente pai
    } else {
      setValido(false);
      setInvalido(true);
      incorreto(true);
    }
  };

  return (
    <CInputGroup>
      <CInputGroupText>
        <CIcon
          onClick={toggleSenhaVisivel}
          icon= {cilTouchApp}
        />
      </CInputGroupText>
      <CFormInput
        key={limpar} 
        placeholder="Digite a senha"
        type={senhaVisivel ? 'text' : 'password'}
        defaultValue={senha}
        onChange={handleSenhaChange}
        disabled={desabilitado}
        required={obrigatorio}
        valid={valido}
        invalid={invalido}
        feedbackInvalid="Mínimo 6 caracteres | 1 letra | 1 número"
        feedbackValid="OK"
      />
    </CInputGroup>
  );
};
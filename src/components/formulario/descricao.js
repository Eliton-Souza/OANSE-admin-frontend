import { CFormTextarea } from '@coreui/react';

export const DescricaoField = ({ onChange, descricao }) => {
  
  const handleTextChange = (event) => {
    const novoTexto = event.target.value;
    onChange(novoTexto);
  };

  return (
    <CFormTextarea
      defaultValue={descricao}
      id="textarea"
      label="Anotações"
      placeholder='Descreva aqui'
      rows={3}
      text="Máximo de 200 caracteres"
      onChange={handleTextChange}
      maxLength={200} // Define o limite máximo de caracteres
    />
  );
};
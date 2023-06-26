import { CFormTextarea } from '@coreui/react';

export const DescricaoField = ({ onChange }) => {
  
  const handleTextChange = (event) => {
    const novoTexto = event.target.value;
    onChange(novoTexto);
  };

  return (
    <CFormTextarea
      id="textarea"
      floatingLabel="Anotações"
      placeholder='Motivo'
      rows={3}
      text="Máximo de 200 caracteres"
      onChange={handleTextChange}
      maxLength={200} // Define o limite máximo de caracteres
    />
  );
};
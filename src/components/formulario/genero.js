import { CFormCheck, CFormLabel } from "@coreui/react";

export const GeneroField = ({ genero, onChange, desabilitado, obrigatorio }) => {

  const handleGeneroChange = (event) => {
    
    const novoGenero = event.target.value;
    onChange(novoGenero);
  };

  return (
    <div>
      <CFormLabel>Gênero</CFormLabel>
      <br />
      <CFormCheck
        inline
        type="radio"
        name="radioGenero"
        id="radioMasculino"
        value="M"
        label="Masculino"
        checked={genero === "M"}
        onChange={handleGeneroChange}
        disabled={desabilitado}
        required={obrigatorio}
      />
      <CFormCheck
        inline
        type="radio"
        name="radioGenero"
        id="radioFeminino"
        value="F"
        label="Feminino"
        checked={genero === "F"}
        onChange={handleGeneroChange}
        disabled={desabilitado}
        required={obrigatorio}
      />
    </div>
  );
};

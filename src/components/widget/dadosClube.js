import { CImage, CWidgetStatsD } from "@coreui/react";

export const DadosClube = ({ totalAlunos, totalValor, cor, logo }) => {
  const style = {
    border: "2px solid" + cor, // Adicione o estilo de borda desejado
    //backgroundColor: cor, // Use a cor fornecida como background
  };

  return (
    <CWidgetStatsD
      className="mb-3"
      icon={<CImage className="mt-0 mb-0" width="100%" src={logo} />}
      style={style} // Aplicando o estilo personalizado
      values={[
        { title: 'Alunos', value: totalAlunos },
        { title: 'Valor', value: totalValor },
      ]}
    />
  );
};

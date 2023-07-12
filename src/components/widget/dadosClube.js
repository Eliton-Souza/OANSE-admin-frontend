
import CIcon from "@coreui/icons-react";
import { CWidgetStatsD } from "@coreui/react";

export const DadosClube = ({ totalAlunos, totalValor, cor, icone }) => {
  return (
    <CWidgetStatsD
    className="mb-3"
    icon={<CIcon className="my-4 text-white" icon={icone} height={52} />}
    style={{ '--cui-card-cap-bg': cor }}
    values={[
      { title: 'Alunos', value: totalAlunos },
      { title: 'Valor', value: totalValor },
    ]}
    />
  );
};
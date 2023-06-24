import { cilCash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CWidgetStatsC } from "@coreui/react";

export const SaldoField = ({ saldo }) => {

  return (
    <CWidgetStatsC
      className="mb-3"
      icon={<CIcon icon={cilCash} height={35} />}
      title="Saldo"
      value={saldo? saldo : "0" }
    />
  );
};
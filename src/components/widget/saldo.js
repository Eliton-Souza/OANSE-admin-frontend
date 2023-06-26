import { cilCash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CWidgetStatsC } from "@coreui/react";
import numeral from "numeral";

export const SaldoField = ({ saldo, id_carteira, modalSaldo }) => {

  const handleClick = () => {
    if (id_carteira) {
      modalSaldo(true);
    }
  }

  return (
    <CWidgetStatsC
      className="mb-3"
      icon={<CIcon icon={cilCash} height={35} />}
      title="Saldo"
      value={saldo ? numeral(saldo).format('0,0.00') : "0"}
      onClick={handleClick}
    />
  );
};
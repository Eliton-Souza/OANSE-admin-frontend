import { cilBirthdayCake } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CWidgetStatsC } from "@coreui/react";
import { differenceInYears } from 'date-fns';

export const IdadeField = ({ nascimento }) => {

  return (
    <CWidgetStatsC
      className="mb-3"
      icon={<CIcon icon={cilBirthdayCake} height={35} />}
      title="Idade"
      value= {differenceInYears(new Date(), new Date(nascimento))}
    />
  );
};
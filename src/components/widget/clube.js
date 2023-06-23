import { cilSchool, cilMoodVeryBad } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CWidgetStatsC } from "@coreui/react";

export const ClubeField = ({ clube }) => {

  return (
    <CWidgetStatsC
      className="mb-3"
      icon={<CIcon icon={cilSchool} height={35} />}
      title="Clube"
      value={clube? clube : <CIcon icon={cilMoodVeryBad} height={35} />}
    />
  );
};
import { QrCodeScanner } from "react-simple-qr-code-scanner";

const QRCodeReader = ({ onChangeQR, onChangeLendo }) => {

  return (
    <QrCodeScanner
      onResult={(result) => {
        onChangeQR(result.text);
        onChangeLendo(false);
      }}
      Errors={(error) => {
        console.log(error);
      }}
      facingMode={"enviroment"} //or user
    />
  );
}

export default QRCodeReader;
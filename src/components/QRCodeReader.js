import { useState } from "react";
import { QrCodeScanner } from "react-simple-qr-code-scanner";

const QRCodeReader = ({ onChangeQR, onChangeLendo }) => {

  const [facingMode, setFacingMode] = useState('environment');

  const handleCameraToggle = () => {
    if (facingMode == 'front') {
      setFacingMode('rear');
    }
    else if( facingMode == 'rear'){
      setFacingMode('environment');
    }
    else if( facingMode == 'environment'){
      setFacingMode('user');
    }
    else{
      setFacingMode('front');
    }

    alert(facingMode);
  

  };

  return (
    <>
      <div>
        <button onClick={handleCameraToggle}>Trocar Camera simple</button>
      </div>
      <QrCodeScanner
        onResult={(result) => {
          console.log(result);
          onChangeQR(result.text);
          onChangeLendo(false);
        }}
        Errors={(error) => {
          console.log(error);
        }}
        facingMode={facingMode} //or user
      />
    </>
  );
}

export default QRCodeReader;
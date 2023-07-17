import React from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeReader = ({onChangeQR, onChangeLendo}) => {

  const handleScan = (data) => {
    if (data) {
      onChangeQR(data.text);
      onChangeLendo(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const previewStyle = {
    width: '40%',
    height: 'auto',
  };

  const scannerStyle = {
    width: '100%',
    height: '100%',
  };

  const videoConstraints = {
    facingMode: 'environment', // Seleciona a câmera traseira
  };

  return (
    <>
      <div style={scannerStyle}>
        <QrScanner
          delay={200}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
          facingMode= 'environment'
        />
      </div>
   </>
  ); 
};

export default QRCodeReader;
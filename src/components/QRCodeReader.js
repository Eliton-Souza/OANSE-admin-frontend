import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeReader = ({ onChangeQR, onChangeLendo }) => {
  const [facingMode, setFacingMode] = useState('rear');

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

  const handleCameraToggle = () => {
    setFacingMode((prevFacingMode) => {
      if (prevFacingMode === 'front') {
        return 'rear';
      } else if (prevFacingMode === 'rear') {
        return 'front';
      }
      return prevFacingMode;
    });
  };

  return (
    <>
      <div>
        <button onClick={handleCameraToggle}>Trocar Camera</button>
      </div>
      <div style={scannerStyle}>
        <QrScanner
          delay={200}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
          facingMode={facingMode}
        />
      </div>
    </>
  );
};

export default QRCodeReader;

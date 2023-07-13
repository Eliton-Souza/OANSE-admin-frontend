import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRCode = () => {
  const [qrData, setQrData] = useState('');

  const handleScan = (data) => {
    if (data) {
      setQrData(data.text);
      alert(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const previewStyle = {
    width: '40%',
    height: 'auto',
  };

  return (
    <div>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={previewStyle}
      />
      {qrData && <p>{qrData}</p>}
    </div>
  );
};

export default QRCode;

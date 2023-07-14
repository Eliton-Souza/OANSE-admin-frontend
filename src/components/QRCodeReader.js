import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeReader = ({ onChangeQR, onChangeLendo }) => {
  const [cameraList, setCameraList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraList = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((device) => device.kind === 'videoinput');
        setCameraList(cameras);
        setSelectedCamera(cameras[0]?.deviceId || '');
      } catch (error) {
        console.error('Erro ao obter a lista de câmeras:', error);
      }
    };

    getCameraList();
  }, []);

  const handleScan = (data) => {
    if (data) {
      onChangeQR(data.text);
      onChangeLendo(false);
    }
  };

  const handleError = (error) => {
    console.error('Erro ao ler o código QR:', error);
  };

  return (
    <>
      <select
        value={selectedCamera}
        onChange={(e) => setSelectedCamera(e.target.value)}
      >
        {cameraList.map((camera) => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label}
          </option>
        ))}
      </select>
      <div>
        <QrScanner
          facingMode={selectedCamera ? { exact: selectedCamera } : undefined}
          delay={300}
          style={{ width: '50%', height: 'auto' }}
          videoConstraints={{ facingMode: 'environment' }}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
    </>
  );
};

export default QRCodeReader;

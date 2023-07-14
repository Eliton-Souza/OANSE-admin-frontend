import { CCol, CSpinner } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import QRCodeReader from 'src/components/QRCodeReader';
import { ModalSaldoField } from 'src/components/modalSaldo';
import { api } from 'src/services/api';

const QRCode = () => {

  const [modalSaldo, setModalSaldo] = useState(true)

  const [lendo, setLendo] = useState(true);
  const [loading, setLoading] = useState(true);

  const [qrData, setQrData] = useState('');
  const [aluno, setAluno] = useState(null);

  setTimeout(() => {
    setLoading(false);
  }, 2000); // 2 segundos

  const pegarAluno= async (id) => {
    setLoading(true);
    const aluno = await api.pegarAluno(id);
    setLoading(false);

    setAluno(aluno);
  }

  const closeModal=(id)=>{
    setLendo(true);
    setAluno(null);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos
  }

  useEffect(() => {
    if (qrData != '') {
      pegarAluno(qrData);
    }
  }, [qrData]);

  return (
    <>
     <h1 style={{ fontSize: '24px' }}>Ler QRCode
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
     </h1>

     {lendo &&
        <QRCodeReader onChangeQR={setQrData} onChangeLendo={setLendo}></QRCodeReader>
      }

      {aluno &&
        <CCol xs={12} sm={5} md={5} lg={5} xl={12}>
          <ModalSaldoField
            id_carteira={aluno.id_carteira} id_aluno={aluno.id_aluno} modalSaldo={modalSaldo} onChange={setModalSaldo} saldo={aluno.saldo} modalPai={closeModal}>
          </ModalSaldoField>
        </CCol>
      }
    

    </>
  );
};

export default QRCode;
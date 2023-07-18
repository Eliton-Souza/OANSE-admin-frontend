import { CCard, CCardBody, CCol, CHeader, CRow, CSpinner } from '@coreui/react';
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

  const pegarAluno = async (id) => {
    setLoading(true);
    const aluno = await api.pegarAluno(id);
    setLoading(false);
  
    if (aluno) {
      setAluno(aluno);
    } else {
      alert('Aluno não encontrado');
    }
  };
  

  const closeModal=(value)=>{
    setModalSaldo(value);
    setAluno(null);
    setLendo(true);
  
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos
  }

  useEffect(() => {
    if (qrData !== '') {
      const id = parseInt(qrData);
      if (!isNaN(id)) {
        pegarAluno(id);
      } else {
        alert('qrCode lido não é uma carteira');
      }
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
      <CCard>
        <CHeader>Aponte a camera para o QRCode do aluno</CHeader>
        <CCardBody>
          <CRow>
            <CCol xs={6} sm={6} md={6} lg={6} xl={6}>
              <QRCodeReader onChangeQR={setQrData} onChangeLendo={setLendo}></QRCodeReader>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>      
    }

      {aluno &&
        <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
          <ModalSaldoField
            id_carteira={aluno.id_carteira} id_aluno={aluno.id_aluno} modalSaldo={modalSaldo} onChange={closeModal} saldo={aluno.saldo} nome={`${aluno.nome} ${aluno.sobrenome}`}>
          </ModalSaldoField>
        </CCol>
      }
    </>
  );
};

export default QRCode;
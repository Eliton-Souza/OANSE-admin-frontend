import { CCard, CCardBody, CCardHeader, CCol, CHeader, CRow, CSpinner } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import QRCodeReader from 'src/components/QRCodeReader';
import { ToastPersonalizado } from 'src/components/formulario/toast';
import { ModalSaldoField } from 'src/components/modalSaldo';
import { api } from 'src/services/api';

const QRCode = () => {

  const [modalSaldo, setModalSaldo] = useState(true)

  const [lendo, setLendo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sucesso, setSucesso] = useState({tipo: '', menssagem: ''});

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
      setSucesso({tipo: 'danger', menssagem: 'Aluno não encontrado'});      
      Limpar();
      //window.location.reload();      
    }
  };

  const Limpar = () => {
    setAluno(null);
    setQrData('');
    setLendo(true);
  };
  

  const closeModal=(value)=>{
    setModalSaldo(value);
   // window.location.reload();
    //setAluno(null);
    //setLendo(true);
    Limpar();
  
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
        setSucesso({tipo: 'danger', menssagem: 'QrCode lido não é uma carteira de aluno'});
        Limpar();
        //window.location.reload();
      }
    }
  }, [qrData]);
  

  return (
    <>
     {sucesso.tipo != '' && (           
        <ToastPersonalizado
          titulo={sucesso.tipo=='success'? 'SUCESSO!' : 'ERRO!'}
          menssagem={sucesso.menssagem}
          cor={sucesso.tipo=='success'? 'success' : 'danger'}>
        </ToastPersonalizado>
      )}

      <CCardHeader component="h1">Ler QRCode
        {loading && (
          <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
        )}
      </CCardHeader>

    {lendo &&
      <CCard>
        <CHeader>Aponte a camera para o QRCode do aluno</CHeader>
        <CCardBody>
          <CRow>
            <CCol xs={6}>
              <QRCodeReader onChangeQR={setQrData} onChangeLendo={setLendo}></QRCodeReader>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>      
    }

      {aluno &&
        <CCol xs={12}>
          <ModalSaldoField
            id_carteira={aluno.id_carteira} id_aluno={aluno.id_aluno} modalSaldo={modalSaldo} onChange={closeModal} saldo={aluno.saldo} nome={`${aluno.nome} ${aluno.sobrenome}`} setSucesso={setSucesso}>
          </ModalSaldoField>
        </CCol>
      }
    </>
  );
};

export default QRCode;
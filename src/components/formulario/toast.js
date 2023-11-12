import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react';
import { useEffect, useState } from 'react';

export const ToastPersonalizado = ({ titulo, menssagem, cor}) => {

  const [toast, addToast] = useState(0)

  const baseToast = (
    <CToast color={cor} animation={true} delay={5000} autohide={true} visible={true}>
      <CToastHeader closeButton>
        <div className="fw-bold me-auto">{titulo}</div>
      </CToastHeader>
      <CToastBody>{menssagem}</CToastBody>
    </CToast>
  )

  useEffect(() => {
    addToast(baseToast);
  }, []);

  return (
    <>
      <CToaster push={toast} placement="top-end"/>    
    </>
  )
};
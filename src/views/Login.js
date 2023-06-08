import React from 'react'
import { useState } from 'react'
import { api } from 'src/services/api'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate= useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLoginButton = async () => {

    if(phone && password){

      setLoading(true);
      const result= await api.fazerLogin(phone, password);
      setLoading(false);

      if(result.error){
        setErro(result.error)
      }
      else{
        navigate('/');
      }

    }else{
      setErro("Digite a seus dados");
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Digite seus dados de acesso</p>

                    {erro !== '' &&
                    <CAlert color='danger'>{erro}</CAlert>
                    }

                    {/*login*/}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                      placeholder="Celular"
                      value={phone}
                      onChange={e=>setPhone(e.target.value)}
                      disabled= {loading}
                      />
                    </CInputGroup>

                    {/*senha*/}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Senha"
                        value={password} onChange={e=>setPassword(e.target.value)}
                        disabled= {loading}
                      />
                    </CInputGroup>

                    {/*botao entrar*/}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                        color="primary"
                        className="px-4"
                        onClick={handleLoginButton}
                        disabled= {loading}
                        >
                          {loading ? 'Carregando...' : 'Entrar'}
                        </CButton>
                      </CCol>
              
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
     
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

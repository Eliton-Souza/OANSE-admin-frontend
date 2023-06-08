import React, {useState, useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { api, getToken } from 'src/services/api';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {

  const [loading, setLoading] = useState(true);
  const Navigate= useNavigate();

  useEffect(() => {
    const checkToken = async () => {
     
      if(getToken()!== null){
        const result = api.validaToken();

        if(result.error){
          alert(result.error);
          Navigate('/login');   // token invalido
        }
        else{
          setLoading(false);  //token valido
        }
      }else{
        setLoading(true);
        Navigate('/login')
      }     
    };

    checkToken();
  }, []);


  return (
    <div>
      {!loading &&
        <>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </>
      }
    </div>
  )
}

export default DefaultLayout

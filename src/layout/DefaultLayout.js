import React, {useState, useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { api, getToken } from 'src/services/api';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {

  const [block, setBlock] = useState(true);
  const Navigate= useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token= getToken();
     
      if( token ){
        
        const result= await api.validaToken();

        if(result.error){
          Navigate('/login');   // token invalido
          setBlock(true);
        }
        else{
          setBlock(false);  //token valido
        }

      }else{
        setBlock(true);
        Navigate('/login');
      }     
    };

    checkToken();
  }, []);


  return (
    <div>
      {!block &&
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

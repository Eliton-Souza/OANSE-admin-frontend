import React, {useState, useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import http from 'src/services/axiosConfig';

const DefaultLayout = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Fazer uma solicitação para uma rota protegida
        await http.get('/rotaProtegida');
        // Se a solicitação for bem-sucedida, o token é válido
        setLoading(false);
      } catch (error) {
        // Se a solicitação falhar, o token é inválido
        setLoading(true);
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

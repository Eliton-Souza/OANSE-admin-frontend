import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { removeToken } from 'src/services/api';

export default () => {
  const navigate= useNavigate();

  useEffect(() => {

    removeToken();
    navigate('/login');
  })

  return null;
}
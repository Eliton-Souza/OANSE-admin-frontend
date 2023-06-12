import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Logout = React.lazy(() => import('./views/logout'));
const Alunos = React.lazy(() => import('./views/Alunos'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/alunos', name: 'Alunos', element: Alunos },


  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes

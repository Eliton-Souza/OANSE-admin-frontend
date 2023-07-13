import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Logout = React.lazy(() => import('./views/logout'));
const MeusAlunos = React.lazy(() => import('./views/MeusAlunos'));
const CadastrarAluno= React.lazy(() => import('./views/CadastrarAluno'));
const CadastrarResponsavel= React.lazy(() => import('./views/CadastrarResponsavel'));
const VerResponsaveis= React.lazy(() => import('./views/VerResponsaveis'));
const HistoricoTransacao= React.lazy(() => import('./views/HistoricoTransacao'));
const QRCode= React.lazy(() => import('./views/QRCode'));




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/alunos', name: 'Alunos', element: MeusAlunos },
  { path: '/aluno', name: 'Aluno', element: CadastrarAluno },
  { path: '/responsavel', name: 'Responsavel', element: CadastrarResponsavel },
  { path: '/responsaveis', name: 'Responsaveis', element: VerResponsaveis },
  { path: '/historico', name: 'Historico', element: HistoricoTransacao },
  { path: '/qrcode', name: 'QRCode', element: QRCode },


  


  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes

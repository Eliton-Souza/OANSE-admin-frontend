import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Logout = React.lazy(() => import('./views/logout'));
const MeusAlunos = React.lazy(() => import('./views/MeusAlunos'));
const CadastrarAluno= React.lazy(() => import('./views/CadastrarAluno'));
const CadastrarResponsavel= React.lazy(() => import('./views/CadastrarResponsavel'));
const VerResponsaveis= React.lazy(() => import('./views/VerResponsaveis'));
const HistoricoTransacao= React.lazy(() => import('./views/HistoricoTransacao'));
const VerEstoque= React.lazy(() => import('./views/VerEstoque'));
const CadastrarMaterial= React.lazy(() => import('./views/CadastrarMaterial'));
const QRCode= React.lazy(() => import('./views/QRCode'));
const Perfil= React.lazy(() => import('./views/Perfil'));
const Vendas= React.lazy(() => import('./views/VerVendas'));
const FazerVenda= React.lazy(() => import('./views/FazerVenda'));
const VerCaixa= React.lazy(() => import('./views/VerMovimentacoesCaixa'));




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/perfil', name: 'QRCode', element: Perfil },
  { path: '/alunos', name: 'Alunos', element: MeusAlunos },
  { path: '/aluno', name: 'Aluno', element: CadastrarAluno },
  { path: '/responsavel', name: 'Responsavel', element: CadastrarResponsavel },
  { path: '/responsaveis', name: 'Responsaveis', element: VerResponsaveis },
  { path: '/historico', name: 'Historico', element: HistoricoTransacao },
  { path: '/qrcode', name: 'QRCode', element: QRCode },
  { path: '/estoque', name: 'Estoque', element: VerEstoque },
  { path: '/material', name: 'Material', element: CadastrarMaterial },
  { path: '/vendas', name: 'Vendas', element: Vendas },
  { path: '/venda', name: 'Venda', element: FazerVenda },
  { path: '/caixa', name: 'Caixa', element: VerCaixa },


  


  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes

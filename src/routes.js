import React from 'react'
import { dadosUsuário } from './services/api';

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
const VerLideres= React.lazy(() => import('./views/VerLideres'));
const CadastrarLider= React.lazy(() => import('./views/CadastrarLider'));

const NaoAutorizado= React.lazy(() => import('./views/NaoAutorizado'));

const usuario= dadosUsuário();


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

  //secretaria
  { path: '/naoautorizado', name: 'NaoAutorizado', element: NaoAutorizado },
  { path: '/estoque', name: 'Estoque', element: usuario.id_clube=='8'? VerEstoque : NaoAutorizado},
  { path: '/material', name: 'Material', element: usuario.id_clube=='8'? CadastrarMaterial : NaoAutorizado},
  { path: '/vendas', name: 'Vendas', element: usuario.id_clube=='8'? Vendas : NaoAutorizado},
  { path: '/venda', name: 'Venda', element: usuario.id_clube=='8'? FazerVenda : NaoAutorizado},
  { path: '/caixa', name: 'Caixa', element: usuario.id_clube=='8'? VerCaixa : NaoAutorizado},
  { path: '/lideres', name: 'Lideres', element: usuario.id_clube=='8'? VerLideres : NaoAutorizado},
  { path: '/lider', name: 'Lideres', element: usuario.id_clube=='8'? CadastrarLider : NaoAutorizado},


  


  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes

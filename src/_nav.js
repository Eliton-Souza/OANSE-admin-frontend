import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  //Painel Geral
  cilSpeedometer,
 
  //Meus alunos
  cilUserPlus,
  cilWc,
 
  //Clube
  cilClipboard,
  cilGroup,

  //Transacoes
  cilQrCode,
  cilGraph,
  cilLowVision,
  cilAddressBook,
  cilPuzzle,
  cilCash,
  cilList,
} from '@coreui/icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [

  //Painel Geral - Titulo do NAV
  {
    component: CNavItem,
    name: 'Painel Geral',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },


  //ALUNOS
  {
    component: CNavTitle,
    name: 'Alunos',
  },
  {
    component: CNavItem,
    name: 'Cadastrar Aluno',
    to: '/aluno',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Meus Alunos',
    to: '/alunos',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
  },


  //Secretaria
  {
    component: CNavTitle,
    name: 'SECRETARIA',
  },

  {
    component: CNavGroup,
    name: 'Estoque',
    to: '#',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cadastrar Material',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Ver Estoque',
        to: '/estoque',
      },
      {
        component: CNavItem,
        name: 'Histórico do Estoque ',
        to: '#',
      },
    ],
  },


  {
    component: CNavGroup,
    name: 'Caixa',
    to: '#',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Ver Caixa ',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Estatisticas',
        to: '#',
      },
    ],
  },


  


   //TRANSACOES
   {
    component: CNavTitle,
    name: 'TRANSAÇÕES',
  },
  {
    component: CNavItem,
    name: 'Ler QR Code',
    to: '/qrcode',
    icon: <CIcon icon={cilQrCode} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Histórico',
    to: '/historico',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  },


   //Responsaveis
   {
    component: CNavTitle,
    name: 'Responsáveis',
  },
  {
    component: CNavItem,
    name: 'Cadastrar Responsável',
    to: '/responsavel',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ver Responsáveis',
    to: 'responsaveis',
    icon: <CIcon icon={cilLowVision} customClassName="nav-icon" />,
  },

]

export default _nav

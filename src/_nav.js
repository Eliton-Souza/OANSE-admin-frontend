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
} from '@coreui/icons'

import { CNavItem, CNavTitle } from '@coreui/react'

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


  //CLUBE
  {
    component: CNavTitle,
    name: 'CLUBE',
  },
  {
    component: CNavItem,
    name: 'Meu Clube',
    to: '#',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Seções',
    to: '#',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },


   //TRANSACOES
   {
    component: CNavTitle,
    name: 'TRANSAÇÕES',
  },
  {
    component: CNavItem,
    name: 'Ler QR Code',
    to: '/',
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

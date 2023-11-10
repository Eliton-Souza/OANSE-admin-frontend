import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  //Visão Geral
  cilSpeedometer,
 
  //Meus alunos
  cilUserPlus,
  cilWc,
 
  //Transacoes
  cilQrCode,
  cilGraph,
  cilLowVision,
  cilAddressBook,
  cilCash,
  cilList,
  cilCreditCard,
  cilEqualizer,
} from '@coreui/icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { dadosUsuário } from './services/api';

const usuario= dadosUsuário();

const _nav = [

  {
    component: CNavItem,
    name: 'Visão Geral',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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


if(usuario.id_clube=='8'){
  _nav.splice(1, 0,
    {
      component: CNavTitle,
      name: 'SECRETARIA',
    },
    {
      component: CNavItem,
      name: 'Caixa',
      to: '/caixa',
      icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Vendas',
      icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Fazer Venda',
          to: '/venda',
        },
        {
          component: CNavItem,
          name: 'Ver Vendas',
          to: '/vendas',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Estoque',
      icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Cadastrar Material',
          to: '/material',
        },
        {
          component: CNavItem,
          name: 'Ver Estoque',
          to: '/estoque',
        },
        {
          component: CNavItem,
          name: 'Histórico do Estoque',
          to: '/',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Gerenciamento',
      icon: <CIcon icon={cilEqualizer} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Cadastrar Líder',
          to: '/lider',
        },
        {
          component: CNavItem,
          name: 'Ver líderes',
          to: '/lideres',
        },
      ],
    }
  );
}

export default _nav;
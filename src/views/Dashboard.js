import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartDoughnut} from '@coreui/react-chartjs'

import { api } from 'src/services/api'
import { DadosClube } from 'src/components/widget/dadosClube'

import logoUrsinho from "../assets/images/logosClubes/ursinho.png"
import logoFaisca from "../assets/images/logosClubes/faiscas.png"
import logoFlama from "../assets/images/logosClubes/flama.png"
import logoTocha from "../assets/images/logosClubes/tocha.png"
import logoJV from "../assets/images/logosClubes/jv.png"
import logoVQ7 from "../assets/images/logosClubes/vq7.png"

import colors from '../layout/color';
import numeral from 'numeral'

const Dashboard = () => {

  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState();

  const [dadosUrsinho, setDadosUrsinho] = useState({ totalAlunos: 0, totalSaldo: 0, cor: '' });
  const [dadosFaisca, setDadosFaisca] = useState({ totalAlunos: 0, totalSaldo: 0, cor: '' });
  const [dadosFlama, setDadosFlama] = useState({ totalAlunos: 0, totalSaldo: 0, cor: '' });
  const [dadosTocha, setDadosTocha] = useState({ totalAlunos: 0, totalSaldo: 0, cor: '' });
  const [dadosJV, setDadosJV] = useState({ totalAlunos: 0, totalSaldo: 0, cor: '' });
  const [dadosVQ7, setDadosVQ7] = useState({ totalAlunos: 0, totalSaldo: 0, cor: '' });

  const getAlunos = async () => {
    setLoading(true);
    const result = await api.rankingAlunos();
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setAlunos(result.alunos);      
    }
  };

  const calcularClube = () => {
    const saldoPorClube = {
      Ursinho: 0,
      Faísca: 0,
      Flama: 0,
      Tocha: 0,
      JV: 0,
      VQ7: 0
    };
    const alunosPorClube = {
      Ursinho: 0,
      Faísca: 0,
      Flama: 0,
      Tocha: 0,
      JV: 0,
      VQ7: 0
    };
  
    // Iterar sobre os alunos e somar o saldo de cada clube
    alunos.forEach((aluno) => {
      const clube = aluno.clube;
      const saldo = aluno.saldo;
  
      saldoPorClube[clube] += saldo;
      alunosPorClube[clube]++;
    });

    setDadosUrsinho({ totalAlunos: alunosPorClube["Ursinho"], totalSaldo: saldoPorClube["Ursinho"], cor: colors.ursinho });
    setDadosFaisca({ totalAlunos: alunosPorClube["Faísca"], totalSaldo: saldoPorClube["Faísca"], cor: colors.faisca });
    setDadosFlama({ totalAlunos: alunosPorClube["Flama"], totalSaldo: saldoPorClube["Flama"], cor: colors.flama });
    setDadosTocha({ totalAlunos: alunosPorClube["Tocha"], totalSaldo: saldoPorClube["Tocha"], cor: colors.tocha });
    setDadosJV({ totalAlunos: alunosPorClube["JV"], totalSaldo: saldoPorClube["JV"], cor: colors.jv });
    setDadosVQ7({ totalAlunos: alunosPorClube["VQ7"], totalSaldo: saldoPorClube["VQ7"], cor: colors.vq7 });
  };
  
  useEffect(() => {
    getAlunos();
  }, []);

  useEffect(() => {
    if (alunos.length > 0) {
      calcularClube();
    }
  }, [alunos]);


  return (
    <>
      <CCol xs={12} sm={12} md={12} lg={12} xl={12}>
        <CCard className="mt-2">
          <CCardHeader>Ranking 
          {loading && (
            <CSpinner color="success" size="sm" style={{ marginLeft: '15px' }}/>
          )}
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive striped bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell className="text-center col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">Pos.</CTableHeaderCell>
                  {/*<CTableHeaderCell className="text-center col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">Foto</CTableHeaderCell>*/}
                  <CTableHeaderCell className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Aluno</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Clube</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">Saldo</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {alunos.map((aluno, index) => (
                  <CTableRow key={aluno.id_aluno}>
                    {index === 0 || alunos[index - 1].saldo !== aluno.saldo ? (
                      <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                    ) : (
                      <CTableDataCell className="text-center">{' '}</CTableDataCell>
                    )}
                    {/*<CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src={'https://w7.pngwing.com/pngs/31/457/png-transparent-computer-icons-user-profile-avatar-user-heroes-business-user.png'}
                      />
                    </CTableDataCell>*/}
                    <CTableDataCell>{`${aluno.nome} ${aluno.sobrenome}`}</CTableDataCell>
                    <CTableDataCell className="text-center">{aluno.clube}</CTableDataCell>
                    <CTableDataCell className="text-center">{numeral(aluno.saldo).format('0,0').split(',').join('.')}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>


      <CRow className="mt-4">
        <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
          <CCard className="mt-4">
            <CCardHeader>Total de Alunos por Clube</CCardHeader>
            <CCardBody>
            <CChartDoughnut
                data={{
                  labels: ['Ursinho', 'Faísca', 'Flama', 'Tocha', 'JV', 'VQ7'],
                  datasets: [
                    {
                      data: [
                        dadosUrsinho.totalAlunos,
                        dadosFaisca.totalAlunos,
                        dadosFlama.totalAlunos,
                        dadosTocha.totalAlunos,
                        dadosJV.totalAlunos,
                        dadosVQ7.totalAlunos,
                      ],
                      backgroundColor: [
                        dadosUrsinho.cor,
                        dadosFaisca.cor,
                        dadosFlama.cor,
                        dadosTocha.cor,
                        dadosJV.cor,
                        dadosVQ7.cor,
                      ],
                      hoverBackgroundColor: [
                        dadosUrsinho.cor,
                        dadosFaisca.cor,
                        dadosFlama.cor,
                        dadosTocha.cor,
                        dadosJV.cor,
                        dadosVQ7.cor,
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
          <CCard className="mt-4">
            <CCardHeader>Dinheiro por Clube</CCardHeader>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: ['Ursinho', 'Faísca', 'Flama', 'Tocha', 'JV', 'VQ7'],
                  datasets: [
                    {
                      data: [
                        dadosUrsinho.totalSaldo,
                        dadosFaisca.totalSaldo,
                        dadosFlama.totalSaldo,
                        dadosTocha.totalSaldo,
                        dadosJV.totalSaldo,
                        dadosVQ7.totalSaldo,
                      ],
                      backgroundColor: [
                        dadosUrsinho.cor,
                        dadosFaisca.cor,
                        dadosFlama.cor,
                        dadosTocha.cor,
                        dadosJV.cor,
                        dadosVQ7.cor,
                      ],
                      hoverBackgroundColor: [
                        dadosUrsinho.cor,
                        dadosFaisca.cor,
                        dadosFlama.cor,
                        dadosTocha.cor,
                        dadosJV.cor,
                        dadosVQ7.cor,
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow className="mt-4">
        <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
          <DadosClube totalAlunos={dadosUrsinho.totalAlunos} totalValor={dadosUrsinho.totalSaldo} cor={dadosUrsinho.cor} logo={logoUrsinho}></DadosClube>
        </CCol>

        <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
          <DadosClube totalAlunos={dadosFaisca.totalAlunos} totalValor={dadosFaisca.totalSaldo} cor={dadosFaisca.cor} logo={logoFaisca}></DadosClube>
        </CCol>

        <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
          <DadosClube totalAlunos={dadosFlama.totalAlunos} totalValor={dadosFlama.totalSaldo} cor={dadosFlama.cor} logo={logoFlama}></DadosClube>
        </CCol>

        <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
          <DadosClube totalAlunos={dadosTocha.totalAlunos} totalValor={dadosTocha.totalSaldo} cor={dadosTocha.cor} logo={logoTocha}></DadosClube>
        </CCol>

        <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
          <DadosClube totalAlunos={dadosJV.totalAlunos} totalValor={dadosJV.totalSaldo} cor={dadosJV.cor} logo={logoJV}></DadosClube>
        </CCol>

        <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
          <DadosClube totalAlunos={dadosVQ7.totalAlunos} totalValor={dadosVQ7.totalSaldo} cor={dadosVQ7.cor} logo={logoVQ7}></DadosClube>
        </CCol>
      </CRow>          
    </>
  )
}

export default Dashboard

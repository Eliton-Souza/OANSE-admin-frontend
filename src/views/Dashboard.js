import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsD,
} from '@coreui/react'
import { CChartDoughnut, CChartLine, CChartPie } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from './widgets/WidgetsBrand'
import WidgetsDropdown from './widgets/WidgetsDropdown'
import { api } from 'src/services/api'
import { DadosClube } from 'src/components/widget/dadosClube'

const Dashboard = () => {

  
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]
/*
  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]*/

  const [dadosGraficoRanking, setDadosGraficoRanking]= useState({ labels: [], dados: [] });
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

  const coresPorClube = {
    Ursinho: '#FF0000', // vermelho
    Faísca: '#FFFF00', // amarelo
    Flama: '#00AA00', // verde
    Tocha: '#3b5998', // azul
    JV: '#191970', // azul marinho
    VQ7: '#000000', // preto
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

    setDadosUrsinho({ totalAlunos: alunosPorClube["Ursinho"], totalSaldo: saldoPorClube["Ursinho"], cor: '#FF0000' });
    setDadosFaisca({ totalAlunos: alunosPorClube["Faísca"], totalSaldo: saldoPorClube["Faísca"], cor: '#FFFF00' });
    setDadosFlama({ totalAlunos: alunosPorClube["Flama"], totalSaldo: saldoPorClube["Flama"], cor: '#00AA00' });
    setDadosTocha({ totalAlunos: alunosPorClube["Tocha"], totalSaldo: saldoPorClube["Tocha"], cor: '#3b5998' });
    setDadosJV({ totalAlunos: alunosPorClube["JV"], totalSaldo: saldoPorClube["JV"], cor: '#191970' });
    setDadosVQ7({ totalAlunos: alunosPorClube["VQ7"], totalSaldo: saldoPorClube["VQ7"], cor: '#000000' });
  };
  

  const calcularSaldoPorClube = () => {
    const saldoPorClube = {};
    const alunosPorClube = {}; // Adicionado para rastrear a contagem de alunos por clube
  
    // Iterar sobre os alunos e somar o saldo de cada clube
    alunos.forEach((aluno) => {
      const clube = aluno.clube;
      const saldo = aluno.saldo;
  
      if (saldoPorClube[clube]) {
        saldoPorClube[clube] += saldo;
      } else {
        saldoPorClube[clube] = saldo;
      }
  
      // Incrementar a contagem de alunos por clube
      if (alunosPorClube[clube]) {
        alunosPorClube[clube]++;
      } else {
        alunosPorClube[clube] = 1;
      }
    });
  
    // Criar os arrays de labels, dados e contagem de alunos para o gráfico
    const labels = Object.keys(saldoPorClube);
    const dados = Object.values(saldoPorClube);
    const contagemAlunos = Object.values(alunosPorClube); // Novo array com a contagem de alunos por clube
    console.log(contagemAlunos);
  
    setDadosGraficoRanking({ labels: labels, dados: dados });
    // Faça o que desejar com a contagem de alunos por clube (contagemAlunos)
  };
  
  

  
  useEffect(() => {
    getAlunos();
  }, []);

  useEffect(() => {
    if (alunos.length > 0) {
      calcularSaldoPorClube();
      calcularClube();
    }
  }, [alunos]);


  return (
    <>
     {/* <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>}

               {
            </CCardBody>
          </CCard>
        </CCol>
                  </CRow>*/}
              
             
 

             


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
                          <CTableHeaderCell className="text-center col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">Foto</CTableHeaderCell>
                          <CTableHeaderCell className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">Aluno</CTableHeaderCell>
                          <CTableHeaderCell className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Clube</CTableHeaderCell>
                          <CTableHeaderCell className="text-center col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">Saldo</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {alunos.map((aluno, index) => (
                          <CTableRow v-for="item in tableItems" key={aluno.id_aluno}>
                            <CTableDataCell className="text-center">{index+1}</CTableDataCell>
                            <CTableDataCell className="text-center">
                              <CAvatar size="md" src={'https://w7.pngwing.com/pngs/31/457/png-transparent-computer-icons-user-profile-avatar-user-heroes-business-user.png'} />
                            </CTableDataCell>
                            <CTableDataCell>{`${aluno.nome} ${aluno.sobrenome}`}</CTableDataCell>
                            <CTableDataCell>{aluno.clube}</CTableDataCell>
                            <CTableDataCell className="text-center">{aluno.saldo}</CTableDataCell>
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
              <DadosClube totalAlunos={dadosUrsinho.totalAlunos} totalValor={dadosUrsinho.totalSaldo} cor={dadosUrsinho.cor} icone={' '}></DadosClube>
            </CCol>

            <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
              <DadosClube totalAlunos={dadosFaisca.totalAlunos} totalValor={dadosFaisca.totalSaldo} cor={dadosFaisca.cor} icone={' '}></DadosClube>
            </CCol>

            <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
              <DadosClube totalAlunos={dadosFlama.totalAlunos} totalValor={dadosFlama.totalSaldo} cor={dadosFlama.cor} icone={' '}></DadosClube>
            </CCol>

            <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
              <DadosClube totalAlunos={dadosTocha.totalAlunos} totalValor={dadosTocha.totalSaldo} cor={dadosTocha.cor} icone={' '}></DadosClube>
            </CCol>

            <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
              <DadosClube totalAlunos={dadosJV.totalAlunos} totalValor={dadosJV.totalSaldo} cor={dadosJV.cor} icone={' '}></DadosClube>
            </CCol>

            <CCol xs={6} sm={6} md={4} lg={4} xl={4}>
              <DadosClube totalAlunos={dadosVQ7.totalAlunos} totalValor={dadosVQ7.totalSaldo} cor={dadosVQ7.cor} icone={' '}></DadosClube>
            </CCol>
          </CRow>          
  
    </>
  )
}

export default Dashboard

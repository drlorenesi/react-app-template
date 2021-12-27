// Bootstrap
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

import MixedChart from '../components/charts/MixedChart';
import RadialChart from '../components/charts/RadialChart';
import DonutChart from '../components/charts/DonutChart';
import HBarChart from '../components/charts/HBarChart';
import BarChart from '../components/charts/BarChart';
import AreaChart from '../components/charts/AreaChart';

export default function Charts() {
  // Donut Chart
  // -----------
  const donutTitle = 'Ventas';
  const donutSeries = [44, 55, 13, 43, 22];
  const donutLabels = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];

  // Bar Chart
  // ---------
  const barTitle = 'Bar Chart Example';
  const barSeries = [
    {
      name: '2021',
      type: 'column',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 900, 1000],
    },
    {
      name: '2022',
      type: 'column',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 900, 1000],
    },
  ];
  const barLabels = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  // Mixed Chart
  // ---------
  const mixedTitle = 'Mixed Chart Example';
  const mixedSeries = [
    {
      name: '2021',
      type: 'column',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 900, 1000],
    },
    {
      name: '2022',
      type: 'column',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 900, 1000],
    },
    {
      name: 'Meta',
      type: 'line',
      data: [440, 480, 450, 480, 580, 680, 790, 1200, 1250, 1480, 990, 1100],
    },
  ];
  const mixedLabels = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  // Horizontal Bar Chart
  // --------------------
  const hbarTitle = 'Horizontal Bar Chart Example';
  const hbarSeries = [
    {
      name: 'Countries',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ];
  const hbarLabels = [
    'South Korea',
    'Canada',
    'United Kingdom',
    'Netherlands',
    'Italy',
    'France',
    'Japan',
    'United States',
    'China',
    'Germany',
  ];

  // Area/Line Chart
  // ---------------
  const areaTitle = 'Area Chart Example';
  const areaSeries = [
    {
      name: 'Before',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'After',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];
  const areaLabels = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
  ];

  // Radial Chart
  // ------------
  const radialSeries = [100];
  const radialLabels = ['Meta'];

  return (
    <>
      <h1>Charts</h1>
      <Row>
        <Col md={6}>
          <div className='d-flex justify-content-center'>
            <MixedChart
              title={mixedTitle}
              series={mixedSeries}
              labels={mixedLabels}
              width='400'
            />
          </div>
        </Col>
        <Col md={6}>
          <div className='d-flex justify-content-center'>
            <RadialChart
              series={radialSeries}
              labels={radialLabels}
              width='380'
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className='d-flex justify-content-center'>
            <DonutChart
              title={donutTitle}
              series={donutSeries}
              labels={donutLabels}
              width='380'
            />
          </div>
        </Col>
        <Col md={6}>
          <div className='d-flex justify-content-center'>
            <HBarChart
              title={hbarTitle}
              series={hbarSeries}
              labels={hbarLabels}
              width='400'
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className='d-flex justify-content-center'>
            <BarChart
              title={barTitle}
              series={barSeries}
              labels={barLabels}
              width='400'
            />
          </div>
        </Col>
        <Col md={6}>
          <div className='d-flex justify-content-center'>
            <AreaChart
              title={areaTitle}
              series={areaSeries}
              labels={areaLabels}
              width='400'
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

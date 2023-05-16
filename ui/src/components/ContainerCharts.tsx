import React, { useEffect, useRef } from 'react';

import { useAppContext } from '../context/AppContext';

import {
  Typography,
  Toolbar,
  Button,
  ButtonGroup,
  Box
} from '@mui/material';

import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// import individual components to save space
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ContainerCharts = () => {
  const { currentContainer, containers, stats } = useAppContext();


  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          display: false
        },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
        },
      },
      y: {
        title: {
          display: true,
          text: 'Percentage',
        },
        min: '0',
        ticks: {
          callback: function(value, index, ticks) {
              return value + '%';
          },
        }
      }
    },

  };

    // line chart data
    const lineData = {
      labels: [null],
      datasets: [
        {
          label: 'percentage used',
          data: [1],
          backgroundColor: 'rgba(255, 99, 132, 0.9)',
          borderColor: 'rgba(53, 162, 235, 0.3)',
        },
      ],
    };



  // MEM CHART OPTIONS & DATA
  const memData = {
    labels: [null],
    datasets: [
      {
        label: 'percentage used',
        data: [1],
        backgroundColor: 'rgba(255, 99, 132, 0.9)',
        borderColor: 'rgba(53, 162, 235, 0.3)',
      },
    ],
  };

  const memOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          display: false
        },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
        },
      },
      y: {
        title: {
          display: true,
          text: 'Percentage',
        },
        min: '0',
        ticks: {
          callback: function(value, index, ticks) {
              return value + '%';
          },
        }
      }
    },

  };

// CPU CHART OPTIONS & DATA
  const cpuOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          display: false
        },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
        },
      },
      y: {
        title: {
          display: true,
          text: 'Percentage',
        },
        min: '0',
        ticks: {
          callback: function(value, index, ticks) {
              return value + '%';
          },
        }
      }
    },

  };
  // cpu chart data
  const cpuData = {
    labels: [null],
    datasets: [
      {
        label: 'percentage used',
        data: [1],
        backgroundColor: 'rgba(255, 99, 132, 0.9)',
        borderColor: 'rgba(53, 162, 235, 0.3)',
      },
    ],
  };



  // create a ref to the chart.js instance
  // works without types, but these have been suggested:
  const lineChartRef = useRef<ChartJS<'line', number[], string>>(null);

  const cpuChartRef = useRef<ChartJS<'line', number[], string>>(null);
  const memChartRef = useRef<ChartJS<'line', number[], string>>(null);


  useEffect(() => {

    // line demo interval
    const interval = setInterval(() => {

      // get the chart.js instance
      const memChart = memChartRef.current;
      const cpuChart = cpuChartRef.current;

      // generate new timestamp
      const newTimestampLabel = new Date().toLocaleTimeString();

      // convert % string to decimal: parseFloat(percent)
      const newMemData = parseFloat(stats[currentContainer].memory);
      const newCpuData = parseFloat(stats[currentContainer].cpu);
      // console.log('*******', chart, newData);

      // push new mem data
      memChart.data.labels.push(newTimestampLabel);
      memChart.data.datasets[0].data.push(newMemData);

      // push new cpu data
      cpuChart.data.labels.push(newTimestampLabel);
      cpuChart.data.datasets[0].data.push(newCpuData);


      // update rendered chart

      memChart.update();
      cpuChart.update();
    }, 2000); //


    // Cleanup interval on component unmount
    return () => clearInterval(interval);

  // end useEffect
  }, []);




  return (
    <>

      <Box style={{ display: "flex", gap: "1rem" }}>

        <Box
          style={{
            position: 'relative',
            height: '20vh',
            width: '45vw',
            margin: 0,
          }}
        >
          <Typography
            style={{ color: 'gray', fontWeight: 'bold', }}
            sx={{ ml:8 }}
          >Memory Usage: {stats[currentContainer]?.memory}</Typography>
          <Line
            id="r2Line"
            ref={memChartRef}
            options={memOptions}
            data={memData}
          />
        </Box>

        <Box
          style={{
            position: 'relative',
            height: '20vh',
            width: '45vw',
            margin: 0,
          }}
        >
          <Typography
            style={{ color: 'gray', fontWeight: 'bold', }}
            sx={{ ml:8 }}
          >CPU Usage: {stats[currentContainer]?.cpu}</Typography>
          <Line
            id="r2Line"
            ref={cpuChartRef}
            options={cpuOptions}
            data={cpuData}
          />
        </Box>


      </Box>
    </>
  );
};

export default ContainerCharts;

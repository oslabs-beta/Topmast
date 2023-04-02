import React from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';


import LogsDashboard from '../components/LogsDashboard';
type Props = {}

const DashboardView = (props: Props) => {
  const { logs } = useAppContext();

  return (
<div>
    <div>
      <LogsDashboard />
    </div>
</div>
  )
}

export default DashboardView

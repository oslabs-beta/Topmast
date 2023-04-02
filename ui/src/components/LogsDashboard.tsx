import React from 'react'
import { useAppContext } from '../context/AppContext'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'



const LogsDashboard = () => {

  const { logs } = useAppContext()


  const logComps = []
  for (const container in logs)
        logComps.push(
          <Card>
            <CardContent>
              <Typography><strong>Container ID:</strong> {container}</Typography>
              <Typography><strong>Output:</strong> {logs[container][1] ? logs[container][1] : 'No output'}</Typography>
              <Typography><strong>Err:</strong> {logs[container][2] ? logs[container][2] : 'No errors'}</Typography>
            </CardContent>
          </Card>
        )

  return (
    <Box style={{ height: 400, width: '100%' }}>
      <h1>topmast</h1>
      <div>{logComps}</div>

    </Box>
  )
}

export default LogsDashboard

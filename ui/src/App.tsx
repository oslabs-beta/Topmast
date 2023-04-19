import { Routes, Route } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import ContainerView from './views/ContainerView';
import LogsDashboard from './components/LogsDashboard';

export function App() {
  return (
    <>

    <h2>TopMast Cross-View Branding</h2>

      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="container" element={<ContainerView />} />
        <Route path="containerlogs" element={<LogsDashboard />} />
      </Routes>
    </>
  );
}
// <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
//   Pressing the below button will trigger a request to the backend. Its
//   response will appear in the textarea.
// </Typography>
//
//
//
// <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
//   <Button variant="contained" onClick={fetchAndDisplayResponse}>
//     Call backend
//   </Button>
//
//   <TextField
//     label="Backend response"
//     sx={{ width: 480 }}
//     disabled
//     multiline
//     variant="outlined"
//     minRows={5}
//     value={response ?? ""}
//   />
// </Stack>

import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { Container, Typography, Button, Grid, Box, List, ListItem, ListItemText } from '@mui/material';

// Register the necessary components
Chart.register(...registerables);

const AnalyticsDashboard = () => {
  const [frequencyData, setFrequencyData] = useState({
    labels: [],
    datasets: []
  });
  const [effectivenessData, setEffectivenessData] = useState({
    labels: [],
    datasets: []
  });
  const [overdueTrendsData, setOverdueTrendsData] = useState({
    labels: [],
    datasets: []
  });
  const [reports, setReports] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Fetch communication frequency data
    axios.get('http://localhost:8000/reporting-module/communication-frequency')
      .then(response => {
        console.log('Frequency Data:', response.data);
        setFrequencyData(response.data);
      })
      .catch(error => console.error(error));

    // Fetch engagement effectiveness data
    axios.get('http://localhost:8000/reporting-module/engagement-effectiveness')
      .then(response => {
        console.log('Effectiveness Data:', response.data);
        setEffectivenessData(response.data);
      })
      .catch(error => console.error(error));

    // Fetch overdue communication trends data
    axios.get('http://localhost:8000/reporting-module/overdue-trends')
      .then(response => {
        console.log('Overdue Trends Data:', response.data);
        setOverdueTrendsData(response.data);
      })
      .catch(error => console.error(error));

    // Fetch reports data
    axios.get('http://localhost:8000/reporting-module/reports')
      .then(response => {
        console.log('Reports Data:', response.data);
        setReports(response.data);
      })
      .catch(error => console.error(error));

    // Fetch real-time activity log
    axios.get('http://localhost:8000/reporting-module/activity-log')
      .then(response => {
        console.log('Activity Log Data:', response.data);
        setActivityLog(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Communication Frequency Report
          </Typography>
          <Bar data={frequencyData} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Engagement Effectiveness Dashboard
          </Typography>
          <Pie data={effectivenessData} />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Overdue Communication Trends
          </Typography>
          <Line data={overdueTrendsData} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Downloadable Reports
          </Typography>
          <Button variant="contained" color="primary" href="http://localhost:8000/reporting-module/reports/download/csv">
            Download CSV
          </Button>
          <Button variant="contained" color="primary" href="http://localhost:8000/reporting-module/reports/download/pdf">
            Download PDF
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Real-Time Activity Log
          </Typography>
          <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
            <List>
              {activityLog.map((log, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${log.date} - ${log.user}: ${log.action}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsDashboard;

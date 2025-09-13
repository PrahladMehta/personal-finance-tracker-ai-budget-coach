import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text } from '@react-pdf/renderer';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch transactions and budgets here using the token
      axios.get('/api/transactions', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setTransactions(res.data))
        .catch(err => console.error("Error fetching transactions:", err));
      axios.get('/api/budgets', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setBudgets(res.data))
        .catch(err => console.error("Error fetching budgets:", err));
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const categories = {};
      transactions.forEach(transaction => {
        categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
      });
      const labels = Object.keys(categories);
      const data = Object.values(categories);
      setChartData({
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      });
    }
  }, [transactions]);


  const MyDocument = () => (
    <Document>
      <Page>
        <Text>Report</Text>
      </Page>
    </Document>
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Please Login</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <Pie data={chartData} />
      <PDFDownloadLink document={<MyDocument />} fileName="report.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Report')}
      </PDFDownloadLink>
      {/* Add input forms for transactions and budgets here */}
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, BarElement);

const Charts = ({ incomeData, expenseData, budgetData }) => {
  const [incomeChart, setIncomeChart] = useState({});
  const [expenseChart, setExpenseChart] = useState({});
  const [budgetChart, setBudgetChart] = useState({});

  useEffect(() => {
    if (incomeData && incomeData.length > 0) {
      const incomeChartData = {
        labels: incomeData.map(item => item.date),
        datasets: [{
          label: 'Income',
          data: incomeData.map(item => item.amount),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
      setIncomeChart(incomeChartData);
    }

    if (expenseData && expenseData.length > 0) {
      const expenseChartData = {
        labels: expenseData.map(item => item.date),
        datasets: [{
          label: 'Expenses',
          data: expenseData.map(item => item.amount),
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      };
      setExpenseChart(expenseChartData);
    }

    if (budgetData && budgetData.length > 0) {
      const budgetChartData = {
        labels: budgetData.map(item => item.month),
        datasets: [{
          label: 'Budget',
          data: budgetData.map(item => item.amount),
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }]
      };
      setBudgetChart(budgetChartData);
    }
  }, [incomeData, expenseData, budgetData]);


  return (
    <div>
      {incomeData && incomeData.length > 0 && (
        <div>
          <h2>Income</h2>
          <Line data={incomeChart} />
        </div>
      )}
      {expenseData && expenseData.length > 0 && (
        <div>
          <h2>Expenses</h2>
          <Line data={expenseChart} />
        </div>
      )}
      {budgetData && budgetData.length > 0 && (
        <div>
          <h2>Budget</h2>
          <Bar data={budgetChart} />
        </div>
      )}
    </div>
  );
};

export default Charts;
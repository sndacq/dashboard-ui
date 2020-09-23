import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

import { selectExpense } from '../expense/expenseSlice';

function Dashboard() {
  const expenseList = useSelector(selectExpense);
  const labels = expenseList.map((d) => d.date);
  const data = expenseList.map((d) => d.amount);
  const chartProperties = {
    type: 'bar',
    labels: labels.reverse(),
    datasets: [{
      label: 'Expense',
      data: data.reverse(),
      fill: false,
      backgroundColor: 'blue',
      borderColor: 'gray',
    }],
  };

  return (
    <Card container>
      <CardContent>
        <Line
          data={chartProperties}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default Dashboard;

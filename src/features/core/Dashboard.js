import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Line, Doughnut } from 'react-chartjs-2';

import { selectExpense, selectCategory } from '../expense/expenseSlice';

function Dashboard() {
  const expenseList = useSelector(selectExpense);
  const categoryList = useSelector(selectCategory);

  const expenseLabels = expenseList.map((d) => d.date);
  const expenseData = expenseList.map((d) => d.amount);
  const barChartProperties = {
    labels: expenseLabels.reverse(),
    datasets: [{
      label: 'Expense',
      data: expenseData.reverse(),
      fill: false,
      backgroundColor: 'blue',
      borderColor: 'gray',
    }],
  };

  const categoryLabels = Object.keys(categoryList).map((c) => categoryList[c]);
  const categorySum = expenseList.reduce((object, expense) => {
    const { category, amount } = expense;
    const totalDictionary = object;

    if (totalDictionary[category] === undefined) {
      totalDictionary[category] = 0;
    }
    totalDictionary[category] += parseFloat(amount);
    return totalDictionary;
  }, {});

  const categoryData = Object.keys(categoryList).map((key) => {
    if (categorySum[key] === undefined) {
      return 0;
    }
    return categorySum[key];
  });

  const doughnutChartProperties = {
    labels: categoryLabels,
    datasets: [{
      label: 'Categories',
      backgroundColor: [
        'blue',
        'red',
        'yellow',
        'green',
        'orange',
      ],
      data: categoryData,
    }],
  };

  return (
    <Grid container className="dashboard-card">
      <Grid item xs={8}>
        <Line
          data={barChartProperties}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Doughnut
          data={doughnutChartProperties}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Card } from 'flowbite-react';

export default function MonthlySpendingChart({ monthlyData }) {
  // Extract data for labels, start dates, and total spending from the provided monthlyData
  const labels = monthlyData.map((data) => {
    const startDate = new Date(data.end_date);
    return startDate.toLocaleDateString("en-US", { month: "long" });
  });

  const spendingData = monthlyData.map((data) => data.total_spending);

  // Define the data for the bar chart
  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Spending",
        display: false,
        data: spendingData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          // display: true,
          text: "Total Spending",
        },
      },
      x: {
        title: {
          display: false,
        },
      },
    },
  };

  return (

    <Card className="shadow-none">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium leading-none text-gray-900 dark:text-white">
          You spent around {formatUSD(monthlyData[5].total_spending)} this month!
        </h5>
      </div>
      <Bar data={data} options={options} />
    </Card>
  )
}

function formatUSD(amount: number): string {
  const formattedAmount = amount.toFixed(2); // Always format to two decimal places
  return `$${formattedAmount}`;
}
"use client"
import { useEffect, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);



export default function Analyze() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/insights/transactions/monthly?date=2023-09-01");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const createDailySpendingData = () => {
    if (data.length === 0) return null;

    const firstDayOfNextMonth = new Date(data[0].date);
    firstDayOfNextMonth.setUTCMonth(firstDayOfNextMonth.getUTCMonth() + 1, 1);
    // Subtract one day to get the last day of the specified month
    firstDayOfNextMonth.setUTCDate(firstDayOfNextMonth.getUTCDate() - 1);
    
    const lastDayOfMonth = firstDayOfNextMonth.getUTCDate();

    const dailyData = new Array(lastDayOfMonth).fill(0);

    data.forEach((transaction) => {
      const date = new Date(transaction.date);
      const day = date.getUTCDate() - 1; // Adjust for zero-based index
      if (transaction.amount > 0) {
        dailyData[day] += transaction.amount;
      }
    });
    const accDailyData = dailyData.reduce((accumulator, currentValue) => {
      if (accumulator.length === 0) {
        return [currentValue];
      } else {
        const lastValue = accumulator[accumulator.length - 1];
        accumulator.push(lastValue + currentValue);
        return accumulator;
      }
    }, []);

    return accDailyData;
  };

  const dailySpendingData = createDailySpendingData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Spending for September 2023',
      },
    },
  };

  const labels = dailySpendingData ? Array.from({ length: dailySpendingData.length }, (_, i) => (i + 1).toString()) : [];

  const chartData = {
    labels,
    datasets: [
      {
        data: dailySpendingData || [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };


  return (
    <main>
      <hr className="w-full h-2 bg-gray-200 mt-4 mb-4" />
      <h1>Test</h1>
      <Line options={options} data={chartData} />
      <hr className="w-full h-2 bg-gray-200 mt-4 mb-4" />
    </main>
  );
}
"use client"

import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { MonthContext } from '@/app/insights/layout';
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



const DailySpendingChart = ({ data }) => {
  const currentMonth = useContext(MonthContext);
  var currDate = new Date()
  currDate.setMonth(currentMonth - 1);

  const createDailySpendingData = () => {
    if (data.length === 0) return null;

    const firstDayOfNextMonth = new Date(data[0].date);
    firstDayOfNextMonth.setUTCMonth(firstDayOfNextMonth.getUTCMonth() + 1, 1);
    firstDayOfNextMonth.setUTCDate(firstDayOfNextMonth.getUTCDate() - 1);

    const lastDayOfMonth = firstDayOfNextMonth.getUTCDate();

    const dailyData = new Array(lastDayOfMonth).fill(0);

    data.forEach((transaction) => {
      const date = new Date(transaction.date);
      const day = date.getUTCDate() - 1;
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
  var dailySpendingDataToDisplay = dailySpendingData;
  if (new Date().getMonth() == new Date(data[0].date).getMonth()) {
    dailySpendingDataToDisplay = dailySpendingData.slice(0, new Date().getDate());
  }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
  };

  const labels = dailySpendingData ? Array.from({ length: dailySpendingData.length }, (_, i) => (i + 1).toString()) : [];

  const chartData = {
    labels,
    datasets: [
      {
        data: dailySpendingDataToDisplay || [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className='mt-4 mb-4 shadow-none' >
      <div className="flex items-center justify">
        <h5 className="text-sm font-medium leading-none text-gray-900 dark:text-white">
          Daily spending for {currDate.toLocaleString('default', { month: 'long' })} 2023
        </h5>
      </div>
      <Line options={options} data={chartData} />
    </Card>
  );
};

export default DailySpendingChart;

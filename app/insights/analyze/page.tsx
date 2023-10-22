"use client"
import { useEffect, useState, useContext } from "react";
import { Spinner } from "flowbite-react";
import { Line } from 'react-chartjs-2';

import { MonthContext } from "../layout";

import CategoryAnalysis from "@/components/insights/analyze/CategoryAnalysis";
import MonthlySpendingChart from "@/components/insights/analyze/MonthlySpendingChart";
import DailySpendingChart from "@/components/insights/analyze/DailySpendingChart";



export default function Analyze() {

  const [data, setData] = useState(Array<any>);
  const [last6MonthsData, setLast6MonthsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentMonth = useContext(MonthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prod/insights/transactions/monthly?date=${convertMonthToISODate(currentMonth)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchLast6MonthsData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/prod/insights/transactions/last-6-months?date=${convertMonthToISODate(currentMonth)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setLast6MonthsData(responseData);
      } catch (error) {
        console.error("Error fetching last 6 months data:", error);
      }
    }

    async function finishLoad() {
      await fetchData();
      await fetchLast6MonthsData();
      setIsLoading(false);
    }
    finishLoad();
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
    <main className="mt-10">
      {isLoading ? <div className="flex h-screen w-screen justify-center items-center">
        <Spinner size="xl" />
      </div> :
        <div>
          <CategoryAnalysis data={data} />
          <DailySpendingChart data={data} /> {/* Add the DailySpendingChart component */}
          <MonthlySpendingChart monthlyData={last6MonthsData} />
        </div>
      }
    </main>
  );
}

function convertMonthToISODate(month: number): string {
  if (month < 1 || month > 12) {
    throw new Error('Invalid month. Month should be between 1 and 12.');
  }

  const currentYear = new Date().getFullYear();
  const isoDate = `${currentYear}-${month < 10 ? '0' : ''}${month}-01`;
  return isoDate;
}

"use client"
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/components/Transactions";
import CardRecommendation from "@/components/insights/CardRecommendation";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState, useContext } from "react";

export default function Cards() {

  const [recommendation, setRecommendation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const currDate = new Date();
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prod/insights/card?date=${convertMonthToISODate(currDate.getMonth() + 1)}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prod/fetch/card?date=${convertMonthToISODate(currDate.getMonth() + 1)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setRecommendation(responseData);
        setTimeout(() => {
          setRecommendation(responseData);
          setIsLoading(false);
        }, 2216); // 1500 milliseconds = 1.5 seconds
        // setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Spinner size="xl" />
    </div>
  )

  const renderCardRec = (title, explanation) => {
    return (
      <div>
        <h1 className="font-semibold mb-2 text-blue-700	">{title}</h1>
        <p className="mb-6 text-sm">{explanation}</p>
      </div>
    );
  }

  return (
    <main className='mt-2 min-w-full'>
      <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white mt-6 mb-4">
        Our Credit & Debit Card Recommendations
      </h1>
      <p >Based on your spendings, here are the recommended credit and/or debit cards:</p>
      <div className="w-full h-1 bg-gray-300 my-4"></div>
      <br />
      {recommendation.map((data) => (
        renderCardRec(data.title, data.reason)
      ))}

      <p>Consider applying for these cards that align with your spending habits to maximize rewards and discounts.</p>
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

function filterObjectsByAmount(arr: Array<any>): Array<any> {
  return arr.filter(obj => (obj['amount'] >= 0));
}

"use client"
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/components/Transactions";
import CardRecommendation from "@/components/insights/CardRecommendation";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState, useContext } from "react";

export default function Cards() {

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prod/insights/transactions/monthly?date=${convertMonthToISODate(currentMonth)}`);
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         const responseData = await response.json();
  //         const filteredData = filterObjectsByAmount(responseData)
  //         setTransactions(filteredData);
  //         setTotal(filteredData.reduce((total, transaction) => total + (transaction.modified_amount !== undefined ? transaction.modified_amount : transaction.amount), 0))
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //     fetchData();
  //   }, [currentMonth]);


  return (
    <main className='mt-2 min-w-full'>
      <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        BEST credit & debit card recommendations for YOU based on your recent purchases
      </h1>
    </main>
  );
}

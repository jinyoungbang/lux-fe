"use client"
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/components/Transactions";
import { Button, Card } from "flowbite-react";
import { useEffect, useState, useContext } from "react";
import { MonthContext } from "./layout";

export default function Insights() {
  const [total, setTotal] = useState(1000)
  const [showAllTransactions, setShowAllTransactions] = useState(false)
  const [transactions, setTransactions] = useState([])
  const currentMonth = useContext(MonthContext);
  const visibleTransactions = showAllTransactions ? transactions : transactions.slice(0, 5);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/insights/transactions/monthly?date=${convertMonthToISODate(currentMonth)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setTransactions(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [currentMonth]);

  const viewAll = () => {
    setShowAllTransactions(!showAllTransactions);
  }

  return (
    <main className='mt-2 min-w-full'>
      <div className='flex mb-6'>
        <p className="font-bold text-2xl mx-auto mt-2 mb-4">
          {formatUSD(total)}
        </p>
        <Button size="sm" className='mx-auto' href="/insights/analyze">
          Analyze
        </Button>
      </div>
      <Transactions viewAll={viewAll}>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {visibleTransactions.map((transaction, index) => (
            <TransactionCard key={index} transaction={transaction} />
          ))}
        </ul>
      </Transactions>
    </main>
  );
}

function getTransactionTotal(transactions: Array<number>) {

}

function formatUSD(amount: number): string {
  if (isNaN(amount)) {
    return 'Invalid amount';
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);

  return formattedAmount;
}

function convertMonthToISODate(month: number): string {
  if (month < 1 || month > 12) {
    throw new Error('Invalid month. Month should be between 1 and 12.');
  }

  const currentYear = new Date().getFullYear();
  const isoDate = `${currentYear}-${month < 10 ? '0' : ''}${month}-01`;
  return isoDate;
}
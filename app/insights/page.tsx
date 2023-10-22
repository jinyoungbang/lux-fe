"use client"
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/components/Transactions";
import { Button, Spinner} from "flowbite-react";
import { useEffect, useState, useContext } from "react";
import { MonthContext } from "./layout";

export default function Insights() {
  const [total, setTotal] = useState(0)
  const [showAllTransactions, setShowAllTransactions] = useState(false)
  const [transactions, setTransactions] = useState(Array<any>)
  const [loading, setLoading] = useState(true)
  const currentMonth = useContext(MonthContext);
  const visibleTransactions = showAllTransactions ? transactions : transactions.slice(0, 5);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/prod/insights/transactions/monthly?date=${convertMonthToISODate(currentMonth)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const filteredData = filterObjectsByAmount(responseData)
        setTransactions(filteredData);
        setTotal(filteredData.reduce((total, transaction) => total + transaction.amount, 0))
        setLoading(false);
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
        { loading ? <Spinner size="xl" className='flex mx-auto'/>  :
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {visibleTransactions.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
          </ul>
        }
      </Transactions>
    </main>
  );
}



function getTransactionTotal(transactions: Array<{ [key: string]: any }>): number {
  const total = transactions.reduce((accumulator, transaction) => {
    if (typeof transaction['amount'] === 'number') {
      return accumulator + transaction['amount'];
    }
    return accumulator;
  }, 0);

  return total;
}

function formatUSD(amount: number): string {
  const formattedAmount = amount.toFixed(2); // Always format to two decimal places
  return `$${formattedAmount}`;
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
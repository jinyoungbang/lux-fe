"use client"
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/components/Transactions";
import CardRecommendation from "@/components/insights/CardRecommendation";
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prod/insights/transactions/monthly?date=${convertMonthToISODate(currentMonth)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const filteredData = filterObjectsByAmount(responseData)
        setTransactions(filteredData);
        setTotal(filteredData.reduce((total, transaction) => {
          if (transaction.is_hidden) {
            return total; // Skip this transaction
          }
          return total + (transaction.modified_amount !== undefined ? transaction.modified_amount : transaction.amount);
        }, 0));
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
      <div className='flex mb-6 items-center'>
        <p className="font-bold text-2xl mx-auto mt-2 mb-4">
          {formatUSD(total)}
        </p>
        <Button color="blue" size="lg" className='mx-auto mt-2 mb-4' href="/insights/analyze">
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

      <CardRecommendation />
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
"use client"
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/components/Transactions";
import { Button, Card } from "flowbite-react";
import { useEffect, useState, useCallback } from "react";

const transactions = [
  { title: 'Grocery Shopping', amount: '$50.00', date: '2023-10-21', description: 'Weekly grocery expenses' },
  { title: 'Coffee Shop', amount: '$5.00', date: '2023-10-20', description: 'Morning coffee' },
  // Add more transaction data as needed
];


export default function Home() {
  const [total, setTotal] = useState(1000)

  return (
    <main className='mt-2 min-w-full'>
      <div className='flex'>
        <p className="font-bold text-2xl mx-auto mt-2 mb-4">
          {formatUSD(total)}
        </p>
        <Button size="sm" className='mx-auto'>
          Analyze
        </Button>
      </div>
      <Transactions>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </ul>
      </Transactions>
    </main>
  );
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

"use client"

import React, { ReactNode } from 'react';
import { Card } from 'flowbite-react';

interface TransactionsProps {
  children: ReactNode;
}

const TransactionCard: React.FC<TransactionsProps> = ({children}) => {

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Transactions
        </h5>
        <a
          className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          href="#"
        >
          <p>
            View all
          </p>
        </a>
      </div>
      <div className="flow-root">
        {children}
      </div>
    </Card>
  );
};

export default TransactionCard;

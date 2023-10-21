"use client"

import React, { ReactNode, useState } from 'react';
import { Button, Card } from 'flowbite-react';

interface TransactionsProps {
  children: ReactNode;
  viewAll: () => void;
}

const TransactionCard: React.FC<TransactionsProps> = ({children, viewAll}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    viewAll()
    setIsExpanded(!isExpanded);
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Transactions
        </h5>
        <Button
          pill
          color='light'
          onClick={toggleExpand}
        >
          <p>
            {isExpanded ? 'Collapse' : 'Expand'}
          </p>
        </Button>
      </div>
      <div className="flow-root">
        {children}
      </div>
    </Card>
  );
};

export default TransactionCard;

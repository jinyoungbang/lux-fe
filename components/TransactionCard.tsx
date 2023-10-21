import React from 'react';

import { TransactionData } from '@/types/transaction';
import { Stringifier } from 'postcss';

interface TransactionCardProps {
  transaction: TransactionData
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }: { transaction: TransactionData}) => {
  const { personal_finance_category, personal_finance_category_icon_url, name, amount } = transaction;

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          <img
            alt="Bonnie image"
            className="mb-3 rounded-full shadow-lg"
            height="40"
            src={personal_finance_category_icon_url}
            width="40"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {capitalizeEachWord(personal_finance_category.primary)}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {formatUSD(amount)}
        </div>
      </div>
    </li>
  );
};

export default TransactionCard;


function formatUSD(amount: number): string {
  if (isNaN(amount)) {
    return 'Invalid amount';
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
}

function capitalizeEachWord(text: string): string {
  return text
    .split('_') // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and make the rest lowercase
    .join(' '); // Join the words back with spaces
}
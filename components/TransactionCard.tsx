import React from 'react';

interface TransactionCardProps {
  title: string;
  amount: string;
  date: string;
  description: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  amount,
  date,
  description,
}) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          {/* Transaction image or icon */}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {amount}
        </div>
      </div>
    </li>
  );
};

export default TransactionCard;

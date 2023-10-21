"use client"

import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';



const CategoryAnalysis = ({ data }) => {

  const totalSpending = data.reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate total spending by categories
  const categorySpending = data.reduce((categories, transaction) => {
    const category = transaction.personal_finance_category.primary;
    if (categories[category]) {
      categories[category] += transaction.amount;
    } else {
      categories[category] = transaction.amount;
    }
    return categories;
  }, {});

  // Sort categories by spending in descending order
  const sortedCategories = Object.keys(categorySpending).sort(
    (a, b) => categorySpending[b] - categorySpending[a]
  );

  console.log(totalSpending)
  console.log(categorySpending)

  return (
    <Card className='mt-4 mb-4 shadow-none' >
      <div className="flex items-center justify">
        <h5 className="text-sm font-medium leading-none text-gray-900 dark:text-white">
          Daily spending for {new Date().toLocaleString('default', { month: 'long' })} 2023
        </h5>
      </div>
      test
    </Card>
  );
};

export default CategoryAnalysis;

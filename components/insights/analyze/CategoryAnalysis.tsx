"use client"

import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';


import MultiProgress, { ProgressComponentProps } from "react-multi-progress";


const CategoryAnalysis = ({ data }) => {

  const categorySpending = data.reduce((categories, transaction) => {
    const category = transaction.personal_finance_category.primary;
    if (categories[category]) {
      categories[category].amount += transaction.amount;
    } else {
      categories[category] = {
        amount: transaction.amount,
        percentage: 0, // Initialize percentage
      };
    }
    return categories;
  }, {});

  // Calculate the total spending
  const totalSpending = Object.values(categorySpending).reduce(
    (total, categoryData) => total + categoryData.amount,
    0
  );

  // Calculate percentages and update the data
  for (const category in categorySpending) {
    categorySpending[category].percentage =
      (categorySpending[category].amount / totalSpending) * 100;
  }

  // Sort categories by spending in descending order
  const sortedCategories = Object.keys(categorySpending).sort(
    (a, b) => categorySpending[b].amount - categorySpending[a].amount
  );

  // Get sorted category data with amounts and percentages
  const sortedCategoriesData = sortedCategories.map((category) => ({
    category,
    amount: categorySpending[category].amount,
    percentage: categorySpending[category].percentage,
  }));

  console.log(sortedCategoriesData);

  const CategoryCard = (data: any) => {
    const { category, amount, percentage } = data.data;

    return (
      <div className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="h-2 w-2" style={{ backgroundColor: categoryColors[category], borderRadius: '50%' }}>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
              {category}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {percentage.toFixed(2)}%
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            ${amount}
          </div>
        </div>
      </div>
    );
  };

  const categoryColors = {
    PRIMARY: '#F98080',
    INCOME: '#E3A008',
    TRANSFER_IN: '#31C48D',
    TRANSFER_OUT: '#76A9FA',
    LOAN_PAYMENTS: '8DA2FB',
    BANK_FEES: '#AC94FA',
    ENTERTAINMENT: '#F17EB8',
    FOOD_AND_DRINK: '#DCD7FE',
    GENERAL_MERCHANDISE: '#CDDBFE',
    HOME_IMPROVEMENT: '#C3DDFD',
    MEDICAL: '#BCF0DA',
    PERSONAL_CARE: '#046C4E',
    GENERAL_SERVICES: '#8E4B10',
    GOVERNMENT_AND_NON_PROFIT: '#C81E1E',
    TRANSPORTATION: '#BF125D',
    TRAVEL: '#8DA2FB',
    RENT_AND_UTILITIES: "#31C48D",
  };


  const CategoryBar = (data: any) => {
    const elements = data.map((categoryData: any) => ({
      value: categoryData.percentage,
      color: categoryColors[categoryData.category], // You can set the color based on your requirements
      isBold: false,
    }));

    return (
      <MultiProgress
        transitionTime={1.2}
        elements={elements}
        height={15}
        backgroundColor="gray"
      />
    );
  };
  return (
    <Card className='mt-4 mb-4 shadow-none' >
      <div className="w-full">
        <h5 className="text-md mb-4 font-medium leading-none text-gray-900 dark:text-white">
          Spending by category
        </h5>
        <div className='mb-2'>
          {CategoryBar(sortedCategoriesData)}
        </div>
        <div>
          {sortedCategoriesData.map((data, index) => (<CategoryCard data={data} key={index} />))}
        </div>


      </div>
    </Card>
  );
};

export default CategoryAnalysis;

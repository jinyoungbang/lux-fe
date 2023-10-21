'use client';
import '../globals.css';
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

export default function InsightsLayout({ children }: { children: React.ReactNode, }) {
  const currMonth = new Date().getMonth();
  const [currentPage, setCurrentPage] = useState(currMonth + 1);

  useEffect(() => {
    console.log(currentPage)
    console.log(convertMonthToISODate(currentPage))
  }, [currentPage]) 

  const MonthPagination = () => {
    return (
      <>
        <Pagination
          nextLabel={getMonthFromNumber(currentPage + 1)}
          previousLabel={getMonthFromNumber(currentPage - 1)}
          currentPage={currentPage}
          layout="navigation"
          onPageChange={page => { setCurrentPage(page) }}
          showIcons
          totalPages={12}
        />
      </>
    )
  }
  
  return (
    <>
      <div className="flex flex-col p-4 mt-14">
        <div className="flex flex-col items-center">
          <h1>{getMonthFromNumber(currentPage)}</h1>
          <MonthPagination/>
        </div>
        {children}
      </div>
    </>

  )
}

function convertMonthToISODate(month: number): string {
  if (month < 1 || month > 12) {
    throw new Error('Invalid month. Month should be between 1 and 12.');
  }

  const currentYear = new Date().getFullYear();
  const isoDate = `${currentYear}-${month < 10 ? '0' : ''}${month}-01`;
  return isoDate;
}

function getMonthFromNumber(month: number): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (month >= 1 && month <= 12) {
    return monthNames[month - 1];
  } else {
    return 'N/A';
  }
}
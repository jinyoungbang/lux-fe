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
          currentPage={currentPage}
          layout="navigation"
          onPageChange={page => { setCurrentPage(page) }}
          totalPages={12}
        />
      </>
    )
  }
  
  return (
    <>
      <div className="p-4 sm:ml-64 mt-14">
        <MonthPagination/>
        {children }
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

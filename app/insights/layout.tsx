'use client';
import '../globals.css';
import { Pagination } from "flowbite-react";
import { useEffect, useState, createContext } from "react";
import { usePathname } from 'next/navigation'
import Navigation from "@/components/Navigation";


export const MonthContext = createContext<number>(0);

export default function InsightsLayout({ children }: { children: React.ReactNode, }) {
  const pathname = usePathname()
  console.log(pathname)
  const currMonth = new Date().getMonth();
  const [currentPage, setCurrentPage] = useState(currMonth + 1);

  const MonthProvider = ({ children }: { children: React.ReactNode}) => {
    return (
      <MonthContext.Provider value={currentPage}>
        {children}
      </MonthContext.Provider>
    )
  }

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

  if (pathname === '/insights/cards') return (
    <>
      <div className="flex flex-col p-4 mt-14">
        <MonthProvider>
          {children}
        </MonthProvider>
      </div>
    </>
  )
  
  return (
    <>
      <header className="flex h-14 z-20 relative bg-white mx-auto">
        <Navigation />
      </header>
      <div className="flex flex-col p-4 mt-14">
        <div className="flex flex-col items-center">
          <h1 className='text-xl font-bold'>{getMonthFromNumber(currentPage)}</h1>
          <MonthPagination/>
        </div>
        <MonthProvider>
          {children}
        </MonthProvider>
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
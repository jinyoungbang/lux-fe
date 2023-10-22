import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, ToggleSwitch, CustomFlowbiteTheme } from 'flowbite-react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

import { TransactionData } from '@/types/transaction';

interface TransactionCardProps {
  transaction: TransactionData
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }: { transaction: TransactionData }) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { transaction_id, personal_finance_category, personal_finance_category_icon_url, name, amount, modified_amount, date, is_hidden } = transaction;

  let is_modified = true ? ((amount !== modified_amount) && (modified_amount !== undefined)) : false

  const [currentAmount, setAmount] = useState<number>(is_modified ? modified_amount : amount);
  const [ignoreTransaction, setIgnoreTransaction] = useState<boolean>(is_hidden);
  const [amountModified, setAmountModified] = useState<boolean>(false);
  const [flagModified, setFlagModified] = useState<boolean>(false);
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };

  const toggleAPIUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/prod/toggle-transaction/${transaction_id}`;
  const modifyTransactionAPIURL = `${process.env.NEXT_PUBLIC_API_URL}/api/prod/transaction/${transaction_id}`;

  async function fetchToggle() {
    try {
      const response = await fetch(toggleAPIUrl, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        console.log(await response.json())
      }

    } catch (error) {
      console.error("Error fetching last 6 months data:", error);
    }
  }

  async function fetchModifyAmount() {
    try {
      const response = await fetch(modifyTransactionAPIURL, {
        method: 'PUT', // or 'POST' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({modifiedAmount: currentAmount}),
      });

      if (response.ok) {
        // Request was successful, you can handle the response here if needed
        const data = await response.json();
        console.log(data);
      } else {
        // Handle API error here
        console.error('API request failed:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('Network error:', error);
    }
  }

  const onSaveChanges = async () => {
    props.setOpenModal(undefined)
    // Use transaction_id as parameter
    // currentAmount -> modified_value if modified value does not equal to amount or modified value is undefined
    // ignoreTransaction -> is_hidden

    if (flagModified) {
      console.log("Running flag modified");
      await fetchToggle();
    }

    if (amountModified) {
      console.log("Running amount modified");
      await fetchModifyAmount();
      is_modified = true ? ((currentAmount !== amount) && (currentAmount !== undefined)) : false
    }
    setAmountModified(false);
    setFlagModified(false);
    handleRefresh();
  }

  const onClose = () => {
    props.setOpenModal(undefined)
    setIgnoreTransaction(is_hidden)
    if (modified_amount === undefined) {
      setAmount(amount)
    } else {
      setAmount(modified_amount)
    }
    setAmountModified(false);
    setFlagModified(false);
  }
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setAmount(parseFloat(e.target.value));
    setAmountModified(true);
  };

  const handleToggle = () => {
    setIgnoreTransaction(!ignoreTransaction);
    setFlagModified(true);
  };
  const props = { openModal, setOpenModal, onClose, onSaveChanges, currentAmount, handleAmountChange, ignoreTransaction, handleToggle };


  return (
    <li className="py-3 sm:py-4">
      <button onClick={() => props.setOpenModal('default')} className='w-full h-full'>
        <div className="flex items-center space-x-4">
          <div className={`shrink-0 ${ignoreTransaction ? 'opacity-50' : ''}`}>
            <img
              alt="Bonnie image"
              className="mb-3 rounded-full shadow-lg"
              height="40"
              src={personal_finance_category_icon_url}
              width="40"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className={`truncate text-sm font-medium ${ignoreTransaction ? 'text-gray-300' : 'text-gray-900'}`} >
              {name}
            </p>
            <p className={`truncate text-sm  ${ignoreTransaction ? 'text-gray-200' : 'text-gray-500'}`} >
              {capitalizeEachWord(personal_finance_category.primary)}
            </p>
          </div>
          <div className="flex-1 items-center">
            <p className={`ml-auto truncate text-base font-semibold ${ignoreTransaction ? 'text-gray-300' : 'text-gray-900'}`} >
              {formatUSD(currentAmount)}
            </p>
            {is_modified ? <p className='text-sm text-gray-200'><s>{formatUSD(amount)}</s></p> : <></>}
            <p className={`truncate text-sm  ${ignoreTransaction ? 'text-gray-200' : 'text-gray-500'}`} >
              {formatDateToMMDD(date)}
            </p>
          </div>
        </div>
      </button>
      <Modal theme={customTheme} show={props.openModal === 'default'} position='center' onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>
          <p className="truncate text-sm text-gray-500">
            {date}
          </p>
          {name}
          <p className="truncate text-sm text-gray-500">
            {capitalizeEachWord(personal_finance_category.primary)}
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500">
              In this window, you have the option to hide the selected transaction and modify the amount if
              you covered the expense for your friends and received reimbursement through payment sharing services like Venmo.
            </p>
            <div className='flex justify-between items-center mt-4 mb-4'>
              <Label>Ignore this transaction</Label>
              <ToggleSwitch checked={ignoreTransaction} onChange={handleToggle} />
            </div>
            <div className='flex justify-between items-center'>
              <Label>Change amount</Label>
              <TextInput
                className='w-1/2'
                addon='$'
                sizing='sm'
                defaultValue={currentAmount}
                onChange={handleAmountChange}
              />
            </div>
            {is_modified ? <p className='text-sm text-gray-500'>Original amount: {formatUSD(amount)}</p> : <></>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.onSaveChanges()}>Save Changes</Button>
          <Button color="gray" onClick={() => props.onClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </li>
  );
};

export default TransactionCard;

const customTheme: CustomFlowbiteTheme['modal'] = {
  "content": {
    "base": "relative w-full p-4 pt-20 md:h-auto",
    "inner": "relative p-20 rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]"
  }
};


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

function formatDateToMMDD(dateStr: string): string {
  const date = new Date(dateStr);
  const dateFormatter = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' });
  return dateFormatter.format(date);
}

function capitalizeEachWord(text: string): string {
  return text
    .split('_') // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and make the rest lowercase
    .join(' '); // Join the words back with spaces
}
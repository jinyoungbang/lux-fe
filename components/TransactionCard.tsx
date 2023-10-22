import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, ToggleSwitch } from 'flowbite-react';
import { BsCurrencyDollar } from 'react-icons/bs';

import { TransactionData } from '@/types/transaction';

interface TransactionCardProps {
  transaction: TransactionData
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }: { transaction: TransactionData}) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { transaction_id, personal_finance_category, personal_finance_category_icon_url, name, amount, modified_amount, date, is_hidden } = transaction;
  
  const is_modified = true ? (amount !== modified_amount) || (modified_amount) : false
  
  const [currentAmount, setAmount] = useState<number>(amount);
  const [ignoreTransaction, setIgnoreTransaction] = useState<boolean>(false);

  const onSaveChanges = async () => {
    props.setOpenModal(undefined)
    // Use transaction_id and modify two values shown below
    // currentAmount -> modified_value if modified value does not equal to amount or modified value is undefined
    // ignoreTransaction -> is_hidden
  }
  
  const onClose = () => {
    props.setOpenModal(undefined)
    setIgnoreTransaction(is_hidden)
    if (modified_amount === undefined) {
      setAmount(amount)
    } else {
      setAmount(modified_amount)
    }
  }
  const props = { openModal, setOpenModal, onClose, onSaveChanges, currentAmount, setAmount, ignoreTransaction, setIgnoreTransaction};

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleToggle = () => {
    setIgnoreTransaction(!ignoreTransaction);
  };

  return (
    <li className="py-3 sm:py-4">
      <button onClick={() => props.setOpenModal('default')} className='w-full h-full'>
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
            <p className="truncate text-sm font-medium text-gray-900">
              {name}
            </p>
            <p className="truncate text-sm text-gray-500">
              {capitalizeEachWord(personal_finance_category.primary)}
            </p>
          </div>
          <div className="flex-1 items-center">
            <p className='ml-auto truncate text-base font-semibold text-gray-900'>
              {formatUSD(amount)}
            </p>
            <p className='truncate text-sm text-gray-500'>
              {formatDateToMMDD(date)}
            </p>
          </div>
        </div>
      </button>
      <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header className=''>
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
                defaultValue={formatUSD(currentAmount)} 
                onChange={() => handleAmountChange} 
              />
            </div>
            <p className='truncate text-sm text-gray-500  mt-2'>
              <b>This amount {is_modified ? 'has been modified before' : 'is the original value'}.</b>
            </p>
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
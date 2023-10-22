"use client"
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';
import Image from "next/image";;
import { useRouter } from 'next/navigation';


const CardRecommendation = () => {

  const router = useRouter();

  return (
    <Card className='mt-4 mb-4 shadow-none' >
      <h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">
        We found the perfect card for your spending!
      </h5>
      <div className='flex justify-center'>
        <Image
          alt='credit card'
          src="https://i.ibb.co/hgJ7z3J/6375aad33dbabc9c424b5713-card-mockup-01.png"
          width={200}
          height={200}
        />
      </div>
      <Button color="blue" pill onClick={() => router.push("/insights/cards")}>
        Get more discounts & points
      </Button>
    </Card>
  );
};

export default CardRecommendation;
"use client"
import { useEffect, useState, useCallback } from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
} from 'react-plaid-link';
import { Button, Blockquote } from 'flowbite-react';


export default function Home() {
  const [linkToken, setLinkToken] = useState(null);

  const onSuccess = useCallback((public_token: string, metadata: any) => {
    // Send public_token to the server
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plaid/exchange_public_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    })
      .then((response) => {
        // Handle the response here
      })
      .catch((error) => {
        console.error('Error sending public_token:', error);
      });
  }, []);

  const config: PlaidLinkOptions = {
    onSuccess: onSuccess,
    onExit: (err, metadata) => {
      // Handle exit
    },
    onEvent: (eventName, metadata) => {
      // Handle events
    },
    token: linkToken,
    // required for OAuth; if not using OAuth, set to null or omit:
    // receivedRedirectUri: window.location.href,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plaid/create_link_token`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setLinkToken(data.link_token);
      })
      .catch((error) => {
        console.error('Error fetching Link Token:', error);
      });

    if (ready) {
      open();
    }
  }, [ready]);

  return (
    <main className="flex flex-col justify-between items-center h-screen p-5">
      <div></div>
      <div className="flex flex-col">
        <img
          alt="images"
          className="mb-3 rounded-full shadow-lg mx-auto"
          height="120"
          src="/lighthouse.png"
          width="120"
        />
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-2xl font-bold mx-auto mt-24">Lux</h1>
          <p className="text-md font-extralight mt-2">Illuminate your personal finance</p>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="w-full">
        <Button
          pill
          className="button is-link mx-auto px-8 w-full"
          color="blue"
          size="xl"
          onClick={() => open()}
          disabled={!ready}
        >
          Get Started
        </Button>
      </div>
    </main>
  );

}
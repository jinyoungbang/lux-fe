"use client"
import { useEffect, useState, useCallback } from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
} from 'react-plaid-link';
import { Button } from 'flowbite-react';


export default function Home() {
  const [linkToken, setLinkToken] = useState(null);

  const onSuccess = useCallback((public_token: string, metadata: any) => {
    // Send public_token to the server
    fetch('http://127.0.0.1:5000/api/plaid/exchange_public_token', {
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
    fetch('http://127.0.0.1:5000/api/plaid/create_link_token', {
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
    <main>
      <Button className="button is-link" color="warning" onClick={() => open()} disabled={!ready}>
        Link account
      </Button>
    </main>
  );
}
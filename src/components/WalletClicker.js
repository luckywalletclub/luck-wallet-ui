// pages/index.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [bananas, setBananas] = useState(3499);
  const [harvests, setHarvests] = useState(6);
  const [progress, setProgress] = useState(200);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error('Connection error:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center text-black font-sans">
      <div className="w-[90%] max-w-sm bg-white rounded-xl shadow-lg p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">Remaining Harvest</div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold">Harvest</button>
        </div>
        <div className="text-lg font-bold text-center">🍌 {bananas}</div>
        <div className="relative w-full mt-4 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border-8 border-yellow-200 flex items-center justify-center relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Replace with actual wallet image later */}
              <Image src="/wallet.png" alt="Wallet" width={60} height={60} />
            </div>
            <svg className="absolute top-0 left-0 w-full h-full">
              <circle cx="50%" cy="50%" r="72" stroke="#9333ea" strokeWidth="8" fill="none" strokeDasharray="452" strokeDashoffset={452 - (progress / 900) * 452} />
            </svg>
          </div>
        </div>
        <div className="text-center mt-2 font-bold">{progress}/900</div>
        <div className="flex justify-between items-center mt-4 bg-yellow-100 px-4 py-2 rounded-xl">
          <div>Claim your Banana in</div>
          <div className="font-mono">07:59:59</div>
        </div>
        <div className="flex justify-around mt-6 text-sm">
          <div className="text-purple-700">🏠 Home</div>
          <div className="text-gray-700">📦 Tasks</div>
          <div className="text-gray-700">🧑‍🤝‍🧑 Apes</div>
        </div>
      </div>
      {!connected && (
        <button className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-xl font-bold" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

'use client';

import { useState } from "react";

export default function WalletClicker() {
  const phrases = [
    "Dünyanın en güzel kadını?",
    "Dünyanın en tatlı kadını?",
    "Semih'in Karısı",
    "Ecem'in gözbebeği",
    "Babasının kızı",
    "Annesinin fıstığı",
    "Apakların en güzeli"
  ];

  const [index, setIndex] = useState(0);
  const [showBurcu, setShowBurcu] = useState(false);
  const [burcuSize, setBurcuSize] = useState(20);

  const handleClick = () => {
    if (!showBurcu) {
      setShowBurcu(true); // ilk tıklamada göster
    } else {
      setBurcuSize((prev) => prev + 20); // her tıklamada büyüt
    }

    if (index < phrases.length - 1) {
      setIndex(index + 1); // metni sırayla göster
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">🍀 Luck Wallet Club</h1>

      <div
        onClick={handleClick}
        className="bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 cursor-pointer shadow-lg rounded-2xl p-10 mb-4 transition-all select-none text-center text-black text-lg font-semibold"
      >
        {phrases[index]}
      </div>

      {showBurcu && (
        <div
          className="font-bold text-red-600 mt-4 transition-all"
          style={{ fontSize: `${burcuSize}px` }}
        >
          Burcu
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from "react";

export default function WalletClicker() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [lastClick, setLastClick] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (window?.Telegram?.WebApp?.initDataUnsafe?.user) {
      setTelegramUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  const handleClick = async () => {
    const now = Date.now();
    if (cooldown > 0) return;

    const reward = [0, 5, 10, 20, 50][Math.floor(Math.random() * 5)];
    setPoints(points + reward);
    setLastClick(now);
    setCooldown(0);

    let sec = 10;
    const interval = setInterval(() => {
      sec -= 1;
      setCooldown(sec);
      if (sec === 0) clearInterval(interval);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">

      <h1 className="text-2xl font-bold mb-6 text-center">🍀 Luck Wallet Club</h1>
      <div
        onClick={handleClick}
        className="bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 cursor-pointer shadow-lg rounded-2xl p-10 mb-4 transition-all select-none"
      >
        💼 Tıkla ve Puan Kazan!
      </div>
      <div className="text-lg font-semibold">Puanın: {points}</div>
      {cooldown > 0 && (
        <div className="text-sm text-red-600 mt-2">
          Bekle: {cooldown} saniye...
        </div>
      )}
      {telegramUser && (
        <div className="mt-6 text-xs text-gray-500">
          Giriş yapan: {telegramUser.first_name} (ID: {telegramUser.id})
        </div>
      )}
    </div>
  );
}

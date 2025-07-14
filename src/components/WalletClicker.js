'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function WalletClicker() {
  const router = useRouter();

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
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    const user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
    console.log("🧪 Telegram User:", user);
    if (user) {
      setTelegramUser(user);
    }
  }, []);

  const handleClick = async () => {
    if (!telegramUser) {
      alert("Lütfen uygulamayı Telegram içinden açın!");
      return;
    }

    if (!showBurcu) {
      setShowBurcu(true);
    } else {
      setBurcuSize((prev) => prev + 6);
    }

    if (index < phrases.length - 1) {
      setIndex(index + 1);
    }

    try {
      const res = await axios.post("http://localhost:3001/click", {
        telegram_id: telegramUser.id,
        first_name: telegramUser.first_name
      });
      console.log("✅ API Yanıtı:", res.data);
    } catch (err) {
      console.error("❌ API Hatası:", err);
    }
  };

  const goToLeaderboard = () => {
    router.push("/leaderboard");
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

      <button
        onClick={goToLeaderboard}
        className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-yellow-200 transition-all shadow"
      >
        🏆 Lider Tablosu
      </button>
    </div>
  );
}

'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:3001/leaderboard");
        setUsers(res.data);
      } catch (err) {
        console.error("Leaderboard API hatası:", err);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-4">
      <h1 className="text-3xl font-bold mb-6 mt-10">🏆 Lider Tablosu</h1>

      {users.length === 0 ? (
        <p>Yükleniyor...</p>
      ) : (
        <table className="w-full max-w-xl text-left border border-white rounded-md overflow-hidden mb-8">
          <thead className="bg-yellow-300 text-black">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Kullanıcı</th>
              <th className="p-3">Puan</th>
              <th className="p-3">Tıklama</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.telegram_id} className="border-t border-white hover:bg-white/10">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{user.first_name}</td>
                <td className="p-3">{user.points}</td>
                <td className="p-3">{user.click_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={handleBack}
        className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-yellow-200 transition-all shadow"
      >
        ↩️ Geri Dön
      </button>
    </div>
  );
}

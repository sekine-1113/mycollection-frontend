"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function MyPage() {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigation = useRouter();

  // ログアウト処理
  const handleLogout = () => {
    // JWTトークンをクッキーから削除
    Cookies.remove("token");
    // ログインページにリダイレクト
    navigation.push("./auth/login");
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      // トークンがない場合はログインページにリダイレクト
      navigation.push("./auth/login");
    } else {
      // APIにリクエストを送信
      axios
        .get("http://localhost:3000/api/v1/mypage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          setError("Failed to load profile data");
        });
      axios
        .get("http://localhost:3000/api/v1/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [navigation]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4 text-black">
        My Page
      </h1>
      <div className="text-center mb-4 text-black">
        <p className="text-xl">
          Welcome,
          <span className="font-bold">
            {(userData as { username: string }).username}
          </span>
        </p>
        <p className="text-3xl">Users</p>
        <ul>
          {(users as {id: number, email: string, name: string}[]).map((user) => (
            <li key={user.id}>{user.email} {user.name}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}

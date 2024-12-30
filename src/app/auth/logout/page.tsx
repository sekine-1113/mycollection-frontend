'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // useRouterをインポート

export default function Logout() {
  const navigation = useRouter(); // useRouterフックを使う

  useEffect(() => {
    // クッキーからJWTを削除
    Cookies.remove('token');

    // ログアウト後にログインページにリダイレクト
    navigation.push('../login');
  }, [navigation]);

  return <div>Logging out...</div>;
}

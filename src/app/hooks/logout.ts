export default function logout() {
  // すべてのクッキーを取得
  const allCookies = document.cookie.split(";");

  // 各クッキーに対して有効期限を過去に設定して削除
  for (let i = 0; i < allCookies.length; i++) {
    const cookie = allCookies[i];
    const eqPos = cookie.split("=");
    const name = eqPos[0];
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // 削除されたことを確認するためにコンソールに出力
  console.log("All cookies deleted:", document.cookie);
  window.location.reload();
}

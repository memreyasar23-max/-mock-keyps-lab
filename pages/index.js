import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("mock_token", data.token);
      router.push("/dashboard");
    } else {
      setError("Kullanıcı adı veya şifre hatalı.");
    }
  }

  return (
    <main style={{maxWidth:420,margin:"80px auto",fontFamily:"Arial"}}>
      <h1>KEYPS Eğitim Yönetim Sistemi</h1>
      <p>Security Training Lab</p>

      <form onSubmit={login}>
        <input
          placeholder="T.C. / Kullanıcı Adı"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{width:"100%",padding:12,marginBottom:10}}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{width:"100%",padding:12,marginBottom:10}}
        />

        <button style={{padding:12,width:"100%"}}>
          Giriş Yap
        </button>
      </form>

      {error && <p>{error}</p>}
    </main>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("mock_token");
    if (!token) {
      router.push("/");
      return;
    }

    fetch("/api/exams", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setExams(data.exams || []));
  }, []);

  return (
    <main style={{maxWidth:700,margin:"60px auto",fontFamily:"Arial"}}>
      <h1>Öğrenci Paneli</h1>
      <p>Hoş geldin, Demo Öğrenci</p>

      <h2>Sınavlarım</h2>

      {exams.map(exam => (
        <div key={exam.id}
             style={{border:"1px solid #ccc",padding:15,marginBottom:12}}>
          <b>{exam.name}</b>
          <p>Durum: {exam.status}</p>
          <a href={`/api/exam?id=${exam.id}`}>Detay</a>
        </div>
      ))}
    </main>
  );
}

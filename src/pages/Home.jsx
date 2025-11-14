import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import ArticleCard from "../components/ArticleCard";
import SearchBox from "../components/SearchBox";

export default function Home({ userRole }) {
  const [articles, setArticles] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    const ref = collection(db, "articles");
    const qq = query(ref, orderBy("createdAt","desc"), limit(50));
    const unsub = onSnapshot(qq, snap => {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setArticles(items);
    });
    return () => unsub();
  }, []);

  const filtered = articles
    .filter(a => a.type !== "market" || a.showOnHome)
    .filter(a => a.title.toLowerCase().includes(q.toLowerCase()) || a.keywords?.some(k => k.includes(q.toLowerCase())))
    .slice(0, 10);

  return (
    <div>
      <SearchBox value={q} onChange={setQ} />
      <div className="grid">
        {filtered.map(a => <ArticleCard key={a.id} article={a} userRole={userRole} />)}
      </div>
    </div>
  );
}

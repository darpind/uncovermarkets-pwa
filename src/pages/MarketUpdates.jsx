import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import ArticleCard from "../components/ArticleCard";

export default function MarketUpdates({ userRole }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const ref = collection(db, "articles");
    const qq = query(ref, where("type","==","market"), orderBy("createdAt","desc"));
    const unsub = onSnapshot(qq, snap => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="grid">
      {items.map(a => <ArticleCard key={a.id} article={a} userRole={userRole} />)}
    </div>
  );
}

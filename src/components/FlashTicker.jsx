import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export default function FlashTicker() {
  const [conf, setConf] = useState({ text: "", speed: 30, color: "#caa24c" });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "flash"), snap => {
      if (snap.exists()) setConf(snap.data());
    });
    return () => unsub();
  }, []);

  return (
    <div className="flash-bar" style={{ background: conf.color }}>
      <marquee scrollamount={conf.speed}>{conf.text}</marquee>
    </div>
  );
}

import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ManageFlash() {
  const [conf, setConf] = useState({ text:"", speed:30, color:"#caa24c" });

  useEffect(() => {
    (async () => {
      const d = await getDoc(doc(db, "settings", "flash"));
      if (d.exists()) setConf(d.data());
    })();
  }, []);

  const save = async () => {
    await setDoc(doc(db, "settings", "flash"), conf);
    alert("Flash message updated.");
  };

  return (
    <div>
      <h3>Flash Message</h3>
      <input placeholder="Text" value={conf.text} onChange={e=>setConf({...conf, text:e.target.value})} />
      <input type="number" placeholder="Speed" value={conf.speed} onChange={e=>setConf({...conf, speed:Number(e.target.value)})} />
      <input type="color" value={conf.color} onChange={e=>setConf({...conf, color:e.target.value})} />
      <button className="button-accent" onClick={save}>Save</button>
    </div>
  );
}

import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { TIERS } from "../utils/roles";

export default function ManageArticles() {
  const [form, setForm] = useState({ title:"", description:"", thumbnailUrl:"", linkUrl:"", tier:TIERS.VISITOR });

  const submit = async e => {
    e.preventDefault();
    await addDoc(collection(db, "articles"), {
      ...form,
      type: "newsletter",
      createdAt: serverTimestamp(),
      keywords: [],
      showOnHome: true
    });
    setForm({ title:"", description:"", thumbnailUrl:"", linkUrl:"", tier:TIERS.VISITOR });
    alert("Article created.");
  };

  return (
    <form onSubmit={submit}>
      <h3>Create Newsletter</h3>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      <input placeholder="Thumbnail URL" value={form.thumbnailUrl} onChange={e=>setForm({...form, thumbnailUrl:e.target.value})} />
      <input placeholder="Link URL (Drive or Storage)" value={form.linkUrl} onChange={e=>setForm({...form, linkUrl:e.target.value})} />
      <select value={form.tier} onChange={e=>setForm({...form, tier:e.target.value})}>
        <option value={TIERS.VISITOR}>Visitor</option>
        <option value={TIERS.FREE}>Free Registered</option>
        <option value={TIERS.PAID}>Paid Registered</option>
      </select>
      <button className="button-accent" type="submit">Publish</button>
    </form>
  );
}

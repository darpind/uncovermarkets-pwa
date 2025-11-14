import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { TIERS } from "../utils/roles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ManageMarketUpdates() {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tier, setTier] = useState(TIERS.VISITOR);

  const submit = async e => {
    e.preventDefault();
    await addDoc(collection(db, "articles"), {
      type: "market",
      title, description: "", contentHtml: html, thumbnailUrl,
      tier, createdAt: serverTimestamp(), showOnHome: false
    });
    setTitle(""); setHtml(""); setThumbnailUrl(""); setTier(TIERS.VISITOR);
    alert("Market update published.");
  };

  return (
    <form onSubmit={submit}>
      <h3>Publish Market Update</h3>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <ReactQuill value={html} onChange={setHtml} />
      <input placeholder="Thumbnail URL" value={thumbnailUrl} onChange={e=>setThumbnailUrl(e.target.value)} />
      <select value={tier} onChange={e=>setTier(e.target.value)}>
        <option value={TIERS.VISITOR}>Visitor</option>
        <option value={TIERS.FREE}>Free Registered</option>
        <option value={TIERS.PAID}>Paid Registered</option>
      </select>
      <button className="button-accent" type="submit">Publish</button>
    </form>
  );
}

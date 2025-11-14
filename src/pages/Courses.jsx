import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Courses() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", course:"", comments:"" });
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.course) { setMsg("Please fill mandatory fields."); return; }
    await addDoc(collection(db, "course_enrollments"), { ...form, createdAt: serverTimestamp(), status: "new" });
    setMsg("Enrolled successfully. We'll reach out by email.");
    setForm({ name:"", email:"", phone:"", course:"", comments:"" });
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 480, margin: "0 auto" }}>
      <label>Name*</label><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      <label>Email*</label><input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <label>Phone*</label><input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
      <label>Course*</label><input value={form.course} onChange={e=>setForm({...form, course:e.target.value})} />
      <label>Comments</label><textarea value={form.comments} onChange={e=>setForm({...form, comments:e.target.value})} />
      <button className="button-accent" type="submit">Enroll</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

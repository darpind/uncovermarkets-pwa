import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { TIERS } from "../utils/roles";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "user_roles"), snap => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const updateRole = async (uid, role) => {
    await setDoc(doc(db, "user_roles", uid), { role }, { merge: true });
    alert("Role updated.");
  };

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead><tr><th>Email</th><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select value={u.role} onChange={e => updateRole(u.id, e.target.value)}>
                  <option value={TIERS.FREE}>Free Registered</option>
                  <option value={TIERS.PAID}>Paid Registered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

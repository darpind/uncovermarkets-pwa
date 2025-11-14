const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  await db.collection("user_roles").doc(user.uid).set({
    email: user.email,
    role: "free",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
});

exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
  const db = admin.firestore();
  await db.collection("user_roles").doc(user.uid).delete();
});

// Optional: export enrollments as CSV when admin triggers callable
exports.exportEnrollments = functions.https.onCall(async (data, context) => {
  const db = admin.firestore();
  const snap = await db.collection("course_enrollments").get();
  const rows = [["name","email","phone","course","comments","createdAt"]];
  snap.forEach(d => {
    const x = d.data();
    rows.push([x.name,x.email,x.phone,x.course,x.comments,(x.createdAt?x.createdAt.toDate().toISOString():"")]);
  });
  return rows.map(r => r.join(",")).join("\n");
});

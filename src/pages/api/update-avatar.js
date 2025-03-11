import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const auth = getAuth();
  const user = auth.currentUser;
  const { avatar } = req.body;

  if (!user) return res.status(401).json({ error: "Unauthorized" });

  await updateDoc(doc(db, "users", user.uid), { avatar });
  res.status(200).json({ success: true });
}

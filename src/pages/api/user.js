import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const userDoc = await getDoc(doc(db, "users", user.uid));
  res.status(200).json(userDoc.exists() ? userDoc.data() : {});
}

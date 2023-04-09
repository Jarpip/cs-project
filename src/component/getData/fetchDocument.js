import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { documentId } from "firebase/firestore";
import { toast } from "react-toastify";

export const fecthDocument = (collectionName, docID) => {
  const [doc, setDoc] = useState(null);

  const getDoc = async () => {
    const docRef = doc(db, collectionName, docID);
    const docSnap = await getDoc();

    if (docSnap.exists()) {
      const obj = {
        id: documentId,
        ...docSnap.data(),
      };
      setDoc(obj);
    } else {
      toast.error("Doc not found.");
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  return {
    doc,
  };
};

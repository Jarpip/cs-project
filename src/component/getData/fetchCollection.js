import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const fecthCollection = (collectionName) => {
  const [data, setData] = useState([]);

  const getCollection = () => {
    try {
      const docRef = collection(db, collectionName);

      const q = query(docRef);

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(allData);
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    getCollection();
  });

  return { data };
};

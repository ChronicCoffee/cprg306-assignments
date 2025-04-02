import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where, doc, deleteDoc } from "firebase/firestore";

export async function getItems(userId) {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const q = query(itemsRef);
    const querySnapshot = await getDocs(q);
    
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
}

export async function addItem(userId, item) {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsRef, item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
}

// Optional Challenge: Delete item function
export async function deleteItem(userId, itemId) {
  try {
    const itemRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(itemRef);
    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
}
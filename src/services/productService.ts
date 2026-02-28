import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface ProductData {
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  imageUrl: string;
  stock: number;
  ratingAvg: number;
  ratingCount: number;
}

export interface Product extends ProductData {
  id: string;
}

const COLLECTION_NAME = 'products';

export const getProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Product[];
};

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    callback(products);
  });
};

export const subscribeToProductsByCategory = (categoryName: string, callback: (products: Product[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), where("category", "==", categoryName));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    callback(products);
  });
};

export const addProduct = async (productData: ProductData): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
  return docRef.id;
};

export const updateProduct = async (id: string, productData: Partial<ProductData>): Promise<void> => {
  const productRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(productRef, productData);
};

export const deleteProduct = async (id: string): Promise<void> => {
  const productRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(productRef);
};

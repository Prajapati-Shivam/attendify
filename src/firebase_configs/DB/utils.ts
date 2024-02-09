import { collection, doc } from 'firebase/firestore';

import { db } from '../config';

export const getNewDocId = (collectionName: string) => {
  const collectionRef = collection(db, collectionName);

  const docRef = doc(collectionRef);

  return docRef.id;
};

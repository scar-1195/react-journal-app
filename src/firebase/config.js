import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyD578S8ST3kqhKuxIyH4uT5_6fYrShANSY',
  authDomain: 'react-journal-app-8572a.firebaseapp.com',
  projectId: 'react-journal-app-8572a',
  storageBucket: 'react-journal-app-8572a.appspot.com',
  messagingSenderId: '1033716653632',
  appId: '1:1033716653632:web:d531b3df6c787a969909a5',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

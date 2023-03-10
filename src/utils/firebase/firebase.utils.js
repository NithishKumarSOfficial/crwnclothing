import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzomSHl8k5BuDn5-rIGa6NUgme-J-TyHQ",
  authDomain: "crwn-clothing-f53d6.firebaseapp.com",
  projectId: "crwn-clothing-f53d6",
  storageBucket: "crwn-clothing-f53d6.appspot.com",
  messagingSenderId: "820224289469",
  appId: "1:820224289469:web:1530e949aaad89a9fae5d4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect=()=> signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation) => {

  if(!userAuth) return;


  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }


  return userDocRef;
};


export const createAuthUserWithEmailAndPassword=async(email,password)=>{

  if(!email||!password) return;


  return await createUserWithEmailAndPassword(auth,email,password);

}

export const signAuthUserWithEmailAndPassword=async(email,password)=>{

  if(!email||!password) return;


  return await signInWithEmailAndPassword(auth,email,password);

}


export const signOutUser=async()=>{
await signOut(auth);
}


export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback);
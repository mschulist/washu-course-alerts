
// import './App.css'
import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyD1gX4vh_9PFmfziWTjFXo8Q25gB8VmNWk",
    authDomain: "washu-course-alerts.firebaseapp.com",
    projectId: "washu-course-alerts",
    storageBucket: "washu-course-alerts.appspot.com",
    messagingSenderId: "514873528283",
    appId: "1:514873528283:web:f7d2a2465eef97a7bc61fe",
    measurementId: "G-LZLY2WG27V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


const AuthComponent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check if the user is already signed in
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
  
        // If the user is signed in, navigate to the home page
        if (user) {
          navigate('/home');
        }
      });
  
      return () => unsubscribe();
    }, [navigate]);
  
    const handleSignIn = async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
      navigate('/account-setup')
    };
  
    const handleSignOut = () => {
      firebase.auth().signOut();
    };
  
    return (
      <div>
        {user ? (
          // User is signed in, redirect to home or another page
          <div>
            <h1>Welcome {user.displayName}!</h1>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          // User is not signed in, ask for phone number
          <div>
            <h1>Please sign in with Google</h1>
            <button onClick={handleSignIn}>Sign In with Google</button>
          </div>
        )}
      </div>
    );
  };
  
  export default AuthComponent;
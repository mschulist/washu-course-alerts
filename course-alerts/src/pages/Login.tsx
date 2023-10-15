
// import './App.css'
import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
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
import logo from '../assets/logo2.png';
        

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

const AuthComponent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check if the user is already signed in
      const unsubscribe = auth.onAuthStateChanged((user) => {
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
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
      navigate('/account-setup')
    };
  
    const handleSignOut = () => {
      auth.signOut();
    };
  
    return (
      <div>
        {user ? (
          // User is signed in, redirect to home or another page
          <div>
            <h1>Welcome!</h1>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          // User is not signed in, ask for phone number
        <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-col  w-1/4">
                <img src={logo}></img>
            </div>
            <div className="flex flex-col w-3/4 gap-5">
                <div className="flex flex-row place-content-center">
                    <h1 className="text-center font-bold mb-4">WashU Course Alert</h1>
                </div>
                <div className="flex flex-row place-content-center">
                    <button onClick={handleSignIn} className="button p-5 bg-gray-700">
                        <div className="mt-1">
                            <div className="flex gap-4">
                                <div className="flex w-1/6">
                                    <img width="40px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                                </div>
                                <div className="flex w-5/6">
                                    <p className="text-center">Sign in with Google</p>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        )}
      </div>
    );
  };
  
  export default AuthComponent;
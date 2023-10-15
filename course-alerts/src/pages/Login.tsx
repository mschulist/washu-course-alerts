
// import './App.css'
import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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
import logo from '../assets/logo3.png';
        

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// to prevent errors lol
if (provider) {
  null
}

const AuthComponent = () => {
    const [user, setUser] = useState<unknown>(null)
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
      if (db) {
        console.log("Connected to Firebase");
      } // this is annoying but necessary
  
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
          <div className='top-0 right-0'>
            <h1>Welcome!</h1>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          // User is not signed in, ask for phone number
        <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-col w-1/4">
                <img src={logo}></img>
            </div>
            <div className="flex flex-col w-3/4 gap-5">
                <div className="flex flex-row place-content-center">
                    <h1 className="text-center font-bold mb-4">WashU Course Watch</h1>
                </div>
                <div className="flex flex-row place-content-center">
                    <button onClick={handleSignIn} className="button p-5 w-7/12 bg-gray-200 hover:bg-gray-300 focus:outline-none outline-none">
                        <div className="mt-1">
                            <div className="flex gap-0">
                                <div className="flex w-3/12 h-full p-0 self-center">
                                    <img className="pl-4 pr-0" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                                </div>
                                <div className="flex w-9/12 pl-0 pt-2">
                                    <h1 className="text-3xl text-center text-gray-700">Sign in with Google</h1>
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
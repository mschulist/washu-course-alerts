
// import './App.css'
import React, { Component } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore, doc, setDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1gX4vh_9PFmfziWTjFXo8Q25gB8VmNWk",
  authDomain: "washu-course-alerts.firebaseapp.com",
  projectId: "washu-course-alerts",
  storageBucket: "washu-course-alerts.appspot.com",
  messagingSenderId: "514873528283",
  appId: "1:514873528283:web:f7d2a2465eef97a7bc61fe",
  measurementId: "G-LZLY2WG27V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


firebase.initializeApp(firebaseConfig);



// export const auth = firebase.auth();

export const signInWithGoogle = () => {
  const navigate = useNavigate();
    loginGoogle()
        .then(async () => {
            // this.isLoading = true;
            // Authentication successful
            const user = firebase.auth().currentUser;
            if (user === null) {
                handleLoginError();
            } else {
                await getUserStatus(user.email!).then((status) => {
                    if (status) {
                        // navigate("/home");
                    } else {
                        // navigate("/account-setup");
                    }
                })
                
                // this.props.history.push("home");

            }
            // else {
            //     const userType = await this.registrationService.getUserType(user.email!);
            //     if (userType === null) {
            //         this.isLoading = true;
            //         const email = user!.email || '';
            //         const fName = StringUtils.splitString(user!.displayName || '')[0];
            //         const lName = StringUtils.splitString(user!.displayName || '')[1];
            //         this.registrationService.updateDb(email, fName, lName);
            //         this.router.navigateByUrl('account-type');
            //     }
            //     else {
            //         this.router.navigateByUrl('/');
            //     }
            // }
        })
        // .catch(error => {
        //     // Handle authentication error
        //     console.log(error);
        //     this.handleLoginError();
        // }).finally(() => this.isLoading = false);
};

const handleLoginError = () => {
    // navigate('/login');
}

// True: user has set up account
// False: user has not set up account

async function getUserStatus(email: string): Promise <boolean> {
    return new Promise<boolean> (async (resolve) => {
        const user = firebase.auth().currentUser;
        const userDoc = await getDoc(doc(db, "users", user!.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const phoneNumber: number = userData!.phoneNumber;
            if (phoneNumber) {
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    })
}

function loginGoogle(): Promise<void> {
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
      .then(async (result) => {
        // User signed in
        if (result.user && result.user.email) {
          resolve();
        } else {
          reject("No user data in Google sign-in result.");
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

// function handleAuthentication(this: any,  
//     email: string,
//     userId: string,
//     token: string,
//     expiration: string
//   ) {
//     const expirationDate = new Date(Date.parse(expiration));
//     const user = new User(
//       email,
//       userId,
//       token,
//       expirationDate
//     );
//     this.user.next(user);
//   }


// TODO: Get from  database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }


export default firebase



import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import AccountSetup from "./pages/AccountSetup";
import 'firebase/compat/auth';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// function loginGoogle(): Promise<void> {
//   return new Promise((resolve, reject) => {
//     this.afAuth.signInWithPopup(new GoogleAuthProvider())
//     .then(async (result) => {
//       // User signed in
//       if (result.user && result.user.email) {
//         const idTokenResult = await result.user.getIdTokenResult();
//         const expirationTimeInMilliseconds = idTokenResult.claims['exp'] * 1000;
//         const expiresIn = new Date(expirationTimeInMilliseconds);
//         this.handleAuthentication(result.user.uid, result.user.email, result.user.refreshToken, expiresIn.getTime().toString());
//         resolve();
//       } else {
//         reject("No user data in Google sign-in result.");
//       }
//     })
//     .catch((error) => {
//       reject(error);
//     });
//   });
// }

// TODO: Get from  database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }


// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

function App() {
  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="account-setup" element={<AccountSetup />} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
  
}

export default App



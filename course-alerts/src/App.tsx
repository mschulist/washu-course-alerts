import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import AccountSetup from "./pages/AccountSetup";
import 'firebase/compat/auth';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="account-setup" element={<AccountSetup />} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
  
}

export default App



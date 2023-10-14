import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AccountSetup() {

    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');

    const getEmail = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user != null) {
            return user.email
        } else {
            return null
        }  
    }

    const email = getEmail();



    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.get('http://localhost:3000/receivePhoneNumber', {
            params: {
                phoneNumber: phoneNumber,
                email: email
            }
        })
        console.log(phoneNumber)
        navigate('/home')
    }

    return (
        <>
            <h1>Enter Your Phone Number</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Phone Number:
                    <input type="text" name={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default AccountSetup
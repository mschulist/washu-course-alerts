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
        <h1>Account Setup</h1>
        <div className="w-full">
            <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded-2xl mt-8 px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                </div>
                <div className="mb-6">
                <label className="block text-white-700 text-sm font-bold mb-2" >
                    Phone Number
                </label>
                <input type="text" name={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="shadow text-white appearance-none border border-red-500 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"  placeholder="(XXX)-XXX-XXXX"/>
                <p className="text-red-500 text-xs italic">Please input a valid phone number.</p>
                </div>
                <div className="flex place-content-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    <input type="submit" value="Submit" />
                </button>
                </div>
            </form>
            
        </div>
        </>

    )
}

export default AccountSetup
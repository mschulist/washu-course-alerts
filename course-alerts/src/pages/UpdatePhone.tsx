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
        axios.get('https://receivedata-ph7t7gmwya-uc.a.run.app/updatePhoneNumber', {
            params: {
                phoneNumber: phoneNumber,
                email: email
            }
        }).then((response) => {
            navigate('/home')
            console.log(response.data)
        })
    }

    return (
        <>
            <h1>Update Phone Number</h1>
            <div className="flex items-center justify-center w-full">
                <form onSubmit={handleSubmit} className="w-3/4 bg-gray-700 shadow-md rounded-2xl mt-8 px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    </div>
                    <div className="mb-6">
                        <h4 className="block text-white-700 text-lg font-bold mb-2" >
                            Phone Number
                        </h4>
                        <input type="text" name={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="shadow bg-gray-200 text-gray-800 appearance-none border border-none rounded w-full py-4 px-5 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        {/* <p className="text-red-500 text-xs italic">Please input a valid phone number.</p> */}
                    </div>
                    <div className="flex place-content-center">
                        <input className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Submit" />
                    </div>
                </form>

            </div>
        </>

    )
}

export default AccountSetup
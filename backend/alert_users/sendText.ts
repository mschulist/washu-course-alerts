import axios from 'axios';

const sendText = async (phoneNumber: String, message: String) => {
    const response = await axios.post('https://textbelt.com/text', {
        phone: phoneNumber,
        message: message,
        key: process.env.textbelt_key,
    });
    console.log(response.data);
};

export { sendText };

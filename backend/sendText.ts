import axios from 'axios';

const sendText = async (phoneNumber: String, crs: String) => {
    const response = await axios.post('https://textbelt.com/text', {
        phone: phoneNumber,
        message: `Course ${crs} has open seats!`,
        key: process.env.textbelt_key,
    });
    console.log(response.data);
};

export { sendText };

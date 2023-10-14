import axios from 'axios';
import 'dotenv/config';


const getCourseInfo = async (sem: string, sch: string, dept: string, crs: string) => {
    const uri = 'https://acadinfo.wustl.edu/CourseListings/CourseInfo.aspx'
    
    const params = {
        sem: 'FL2023',
        sch: 'L',
        dept: 'L24',
        crs: '132',
    };

    const res = await axios.get(uri, { params });
    console.log(res.data);
    return res.data;
}

const sendText = async (phoneNumber: String, crs: String) => {
    const response = await axios.post('https://textbelt.com/text', {
        phone: phoneNumber,
        message: `Course ${crs} has open seats!`,
        key: process.env.textbelt_key,
    });
    console.log(response.data);
}

getCourseInfo('FL2023', 'L', 'L24', '132');
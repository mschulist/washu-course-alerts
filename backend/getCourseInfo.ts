import axios from 'axios';

export const getCourseInfo = async (sem: string, sch: string, dept: string, crs: string) => {
    const uri = 'https://acadinfo.wustl.edu/CourseListings/CourseInfo.aspx';

    const params = {
        sem: 'FL2023',
        sch: 'L',
        dept: 'L24',
        crs: '132',
    };

    const res = await axios.get(uri, { params });
    console.log(res.data);
    return res.data;
};

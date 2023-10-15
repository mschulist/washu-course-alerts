import '../App.css'
import { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home() {
    const navigate = useNavigate();
    const [courseNumber, setCourseNumber] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user != null ? user.email : null;
        console.log(courseNumber)
        console.log(semester)
        console.log(section)
        console.log(department)

        const courses = JSON.stringify({
            crs: courseNumber,
            sem: semester,
            sec: section,
            dept: department,
            sch: "L"
        })
        axios.get('https://backend-ph7t7gmwya-uc.a.run.app/receiveCourses', {
            params: {
                courses: courses,
                email: email
            }
        })
        setCourseNumber('')
        setSemester('')
        setSection('')
        setDepartment('')
    }


    const handleSignOut = () => {
        const auth = getAuth();
        auth.signOut();
        navigate('/')
    };

    return (
        <>

            <div className='absolute top-5 right-5 z-10'>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className='absolute m-auto left-0 right-0 top-5'>
                <h1>Add Your Courses Here!</h1>
            </div>
            <div className='absolute left-5 top-5 z-10 w-2/12'>
                <img src="https://acac.wustl.edu/wp-content/themes/acac-theme/assets/images/wustllogo.svg" className='invert'></img>
            </div>
            <div className='flex m-4'>

                <form onSubmit={handleSubmit} className='flex flex-col items-end'>
                    <label>
                        Semester: &nbsp;
                        <input type="text" className="left-align" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder={'SP2024'} />
                    </label>
                    <br />
                    <label>
                        Department: &nbsp;
                        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder={'L24'} />
                    </label>
                    <br />
                    <label>
                        Course Number: &nbsp;
                        <input type="text" value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} placeholder={'233'} />
                    </label>
                    <br />
                    <label>
                        Section: &nbsp;
                        <input type="text" value={section} onChange={(e) => setSection(e.target.value)} placeholder={'01'} />
                    </label>
                    <br />
                    <button type="submit" value="Submit" className='flex w-1/2 justify-center align-center'> Submit </button>
                </form>

            </div>

        </>
    )
}

export default Home
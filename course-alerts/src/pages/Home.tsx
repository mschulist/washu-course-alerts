import '../App.css'
import { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
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
        axios.get('http://localhost:3000/receiveCourses', {
            params: {
                courses: courses,
                email: email
            }
        })
    }

    const getName = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user != null) {
            return user.displayName
        } else {
            return null
        }
    }

    const name = getName();
    if (name === '' && name != null) {
        setUser(name);
    }

    const handleSignOut = () => {
        const auth = getAuth();
        auth.signOut();
        navigate('/')
      };

    return (
        <>

            <div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <div>
                <h1>Welcome {user}</h1>
            </div>

            <div>

                <form onSubmit={handleSubmit}>
                    <label>
                        Semester:
                        <input type="text" name={semester} onChange={(e) => setSemester(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Department:
                        <input type="text" name={department} onChange={(e) => setDepartment(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Course Number:
                        <input type="text" name={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Section:
                        <input type="text" name={section} onChange={(e) => setSection(e.target.value)} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>

            </div>
        </>
    )
}

export default Home
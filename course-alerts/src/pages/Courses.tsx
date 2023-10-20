import '../App.css'

export default function Courses(props: { index: number, courses: { crs: string, sem: string, sec: string, dept: string }, removecourse}) {



    const crs = props.courses.crs;
    const sem = props.courses.sem;
    const sec = props.courses.sec;
    const dept = props.courses.dept;

    const courseGone = () => {
        console.log(props.courses)
        props.removecourse(props.courses)
        console.log("Course deleted")
    }


    return (

        <div className='border-2 rounded-xl m-2 p-8 bg-slate-700'>

            <p>Semester: {sem}</p>
            <p>Department: {dept}</p>
            <p>Course: {crs}</p>
            <p>Section: {sec}</p>

            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={courseGone}>
                Delete
            </button>

        </div>



    )

}
import 'dotenv/config';
import { getSectionSeats } from './getCourseInfo';
import { sendText } from './sendText';
import { getUsers } from './getUsers';
import { removeCourse } from './removeCourse';

// TODO: Add a cron job to run this every 5 minutes
// Get data from firestore
// For each course, check if there are open seats
// If there are open seats, send a text to the user

async function main() {
    const users = await getUsers();


    users.map(async (user: any) => {
        const courses = user.Courses;
        console.log(courses);
        courses.map(async (course: any) => {
            const sec = course.sec;
            const sem = course.sem;
            const sch = course.sch;
            const dept = course.dept;
            const crs = course.crs;
            const parsed = await getSectionSeats(sem, sch, dept, crs, sec);
            if (parsed == null) return;
            const seats = parsed[0];
            const seatsTaken = parsed[1];
            const seatsOpen = seats - seatsTaken;
            console.log(user.name)
            if (seatsOpen > 0) {
                sendText(user.phoneNumber, `${user.name}, there are ${seatsOpen} seats open in ${course.dept} ${course.crs} section ${course.sec}`);
                removeCourse(user.email, course);
            }
        })
    })
}

main();
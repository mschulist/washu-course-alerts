import 'dotenv/config';
import { getCourseInfo } from './getCourseInfo';
import { sendText } from './sendText';
import { getUsers } from './getUsers';

// TODO: Add a cron job to run this every 5 minutes
// Get data from firestore
// For each course, check if there are open seats
// If there are open seats, send a text to the user

async function main() {
    const users: any = getUsers();

    users.map(async (user: any) => {
        const courses = user.courses;
        courses.map(async (course: any) => {
            const sec = course.sec;
            const courseInfo = await getCourseInfo(course.sem, course.sch, course.dept, course.crs);
            const parsed = parse(courseInfo, sec);
            const seats = parsed.seats;
            const seatsTaken = parsed.enroll;
            const seatsOpen = seats - seatsTaken;
            if (seatsOpen > 0) {
                sendText(user.phoneNumber, `${user.name}, there are ${seatsOpen} seats open in ${course.dept} ${course.crs} section ${course.sec}`);
            }
        })
    })

}
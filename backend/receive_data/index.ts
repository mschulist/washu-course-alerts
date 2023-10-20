import { addCourses, addEmailName, addPhoneNumber, getPhoneNumber, getCourses, removeCourse} from "./addUsers";
import * as express from 'express'
var cors = require('cors')

var app = express.default()
app.use(cors())

app.get('/receiveEmailName', (req, res) => {
    const email = req.query.email as string;
    const name = req.query.name as string;
    console.log(email, name)
    addEmailName(email, name);
    res.send('added email and name')
})

app.get('/receivePhoneNumber', (req , res) => {
    const phoneNumber = req.query.phoneNumber as string;
    const email = req.query.email as string;
    addPhoneNumber(phoneNumber, email);
    res.send('added phone number')
})

app.get('/receiveCourses', (req, res) => {
    const courses = JSON.parse(req.query.courses as string);
    const email = req.query.email as string;
    console.log(courses, email)
    addCourses(courses, email);
    res.send('added courses')
})

app.get('/getPhoneNumber', async (req, res) => {
    const email = req.query.email as string;
    const phoneNumber = await getPhoneNumber(email);
    console.log(phoneNumber)
    res.send(phoneNumber)
})

app.get('/getCourses', async (req, res) => {
    console.log(req.query.email)
    const courses = await getCourses(req.query.email as string);
    res.send(courses)
})

app.get('/removeCourse' , async (req, res) => {
    const email = req.query.email as string;
    console.log(req.query.course)
    const course = JSON.parse(req.query.course as string) as { dept: string, crs: string, sec: string, sem: string, sch: string };
    removeCourse(email, course);
    res.send(`removed course ${course.dept} ${course.crs} ${course.sec}`)
})


app.listen(8080, () => {
    console.log('server started on 8080')
})
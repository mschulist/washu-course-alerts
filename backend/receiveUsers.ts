import { addCourses, addEmailName, addPhoneNumber } from "./addUsers";
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
    addCourses(courses, email);
    res.send('added courses')
})

app.listen(3000, () => {
    console.log('server started')
})
import { addCourses, addEmailName, addPhoneNumber } from "./addUsers";
var express = require('express')
var app = express()

app.post('/receiveEmailName', (req: { body: any }, res: any) => {
    const email = req.body.email;
    const name = req.body.name;
    const id = req.body.id;
    addEmailName(email, name, id);
    res.send('added email and name')
})

app.post('/receivePhoneNumber', (req: { body: any }, res: any) => {
    const phoneNumber = req.body.phoneNumber;
    const id = req.body.id;
    addPhoneNumber(phoneNumber, id);
    res.send('added phone number')
})

app.post('/receiveCourses', (req: { body: any }, res: any) => {
    const courses = req.body.courses;
    const id = req.body.id;
    addCourses(courses, id);
    res.send('added courses')
})

app.listen(3000, () => {
    console.log('server started')
})
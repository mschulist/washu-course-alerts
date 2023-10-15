import axios from "axios";
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./firebase_key.json');

initializeApp({
    credential: cert(serviceAccount)
});


async function addEmailName(email: string, name: string) {

    const db = getFirestore();

    const snapshot = await db.collection('users').doc(email).set({
        name: name,
        email: email,
        courses: [],
    });
}

async function addPhoneNumber(phoneNumber: string, email: string) {

    const db = getFirestore();

    const snapshot = await db.collection('users').doc(email).set({
        phoneNumber: phoneNumber,
        email: email,
        courses: [],
    }, { merge: true });
}

async function addCourses(courses: string[], email: string) {

    const db = getFirestore();

    const snapshot = await db.collection('users').doc(email).update({
        courses: FieldValue.arrayUnion(courses)
    }, { merge: true });
}


// async function addUsers(email: string, name: string, phoneNumber: string, courses: string[]) {

//     const db = getFirestore();

//     const snapshot = await db.collection('users').doc(email).set({
//         name: name,
//         phoneNumber: phoneNumber,
//         courses: courses
//     });
// }

export { addCourses, addEmailName, addPhoneNumber };
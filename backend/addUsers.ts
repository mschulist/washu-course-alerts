import axios from "axios";
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./firebase_key.json');

async function addEmailName(email: string, name: string, id: string) {
    initializeApp({
        credential: cert(serviceAccount)
    });

    const db = getFirestore();

    const snapshot = await db.collection('users').doc(id).set({
        name: name,
        email: email
    });
}

async function addPhoneNumber(phoneNumber: string, id: string) {
    initializeApp({
        credential: cert(serviceAccount)
    });

    const db = getFirestore();

    const snapshot = await db.collection('users').doc(id).set({
        phoneNumber: phoneNumber
    });
}

async function addCourses(courses: string[], id: string) {
    initializeApp({
        credential: cert(serviceAccount)
    });

    const db = getFirestore();

    const snapshot = await db.collection('users').doc(id).set({
        courses: courses
    });
}


// async function addUsers(email: string, name: string, phoneNumber: string, courses: string[]) {
//     initializeApp({
//         credential: cert(serviceAccount)
//     });

//     const db = getFirestore();

//     const snapshot = await db.collection('users').doc(email).set({
//         name: name,
//         phoneNumber: phoneNumber,
//         courses: courses
//     });
// }

export { addCourses, addEmailName, addPhoneNumber };
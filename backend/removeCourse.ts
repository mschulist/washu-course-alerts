const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase_key.json');


// course is the course index in 
export async function removeCourse(email: string, course: { dept: string, crs: string, sec: string, sem: string, sch: string }) {

    const db = getFirestore();

    const snapshot = await db.collection('users').doc(email).update({
        Courses: FieldValue.arrayRemove(course)
    });
}

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase_key.json');

initializeApp({
    credential: cert(serviceAccount)
});

async function getUsers(): Promise<any[]> {

    const db = getFirestore();

    const snapshot = await db.collection('users').get();

    return snapshot.docs.map((doc: { data: () => any; }) => doc.data());
}

// getUsers().then((users: any) => {
//     users.map((user: any) => {
//         console.log(user.Courses);
//     })
// })

export { getUsers };
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase_key.json');

async function getUsers() {
    initializeApp({
        credential: cert(serviceAccount)
    });

    const db = getFirestore();

    const snapshot = await db.collection('courses').get();
    
    return snapshot.docs.map((doc: { data: () => any; }) => doc.data());
}

export { getUsers };
// firebaseConfig.js
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
admin.initializeApp( { 
    credential: admin.credential.cert(serviceAccount)
  //   storageBucket: ''
  })


const db = admin.firestore();

module.exports = { admin, db };

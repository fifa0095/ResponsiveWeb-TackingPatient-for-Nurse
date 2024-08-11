// firebaseConfig.js
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
admin.initializeApp( { 
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'i-care-u.appspot.com'
  })



const db = admin.firestore();

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key
  }
});
const bucket = storage.bucket(admin.storage().bucket().name);

module.exports = { admin, db , bucket , storage};

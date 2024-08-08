const  { db } = require('../config_db/firebaseConfig');
const crypto = require('crypto');


const multer = require('multer');

const firestoreTimestampToDate = (firestoreTimestamp) => {
  // Create a JavaScript Date object using the seconds and milliseconds
  const milliseconds = firestoreTimestamp._seconds * 1000 + firestoreTimestamp._nanoseconds / 1000000;
  return new Date(milliseconds);
};

const dateToFirestoreTimestamp = (date) => {
  // Get the milliseconds since the epoch
  const milliseconds = date.getTime();
  // Convert milliseconds to seconds and nanoseconds
  const seconds = Math.floor(milliseconds / 1000);
  const nanoseconds = (milliseconds % 1000) * 1000000;
  return { _seconds: seconds, _nanoseconds: nanoseconds };
};

// const { Storage } = require('@google-cloud/storage');
// const storage = new Storage({
//   projectId: serviceAccount.project_id,
//   credentials: {
//     client_email: serviceAccount.client_email,
//     private_key: serviceAccount.private_key
//   }
// });
// const bucket = storage.bucket(admin.storage().bucket().name);


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

function checkfield(requiredFields, req){
  for (const field of requiredFields) {
      if (!req.body[field]) {
          return res.status(400).json({
              message: `Missing required field: ${field}`
          });
      }
    }
}

function hashData(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}

// create new patient info
const AddPatient = async (req, res ) => {
    try {
      const requiredFields = [
        'HN',
        'prefix',
        'name',
        'surname',
        'gender',
        'DOB'
      ];

      checkfield(requiredFields,req);

      const response = await db.collection('patients').doc(req.body.HN).create(req.body);

      res.status(200).send('success');
    } catch (error) {
      res.status(500).send(error.message);
    }
}

// edit patient info
const EditPatient = async (req, res ) => {
    try {
      const requiredFields = [
        'HN',
        'prefix',
        'name',
        'surname',
        'gender',
        'DOB'
      ];

      checkfield(requiredFields,req);

      const response = await db.collection('patients').doc(req.body.HN).update(req.body);

      res.status(200).send('success');
    } catch (error) {
      res.status(500).send(error.message);
    }
}


// get patient info 
const FindPatient = async (req, res) => {
  try {
    const { HN } = req.query;
    let patientsRef = db.collection('patients');
    let snapshot;

    if (!HN) {
      // Default search: Fetch random data ordered by the latest update
      snapshot = await patientsRef.limit(15).get();
    } else {
      // Search with the HN parameter
      snapshot = await patientsRef.where('HN', '==', HN).get();
    }

    const patients = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      // Convert Firestore timestamp fields to JavaScript Date
      if (data.DOB) {
        data.DOB = firestoreTimestampToDate(data.DOB);
      }
      patients.push({ id: doc.id, ...data });
    });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// delete patient info
const DelPatient = async (req, res ) => {
  try {
      
  } catch (error) {
    res.status(500).send(error.message);
  }
}


// Add new record
const AddRecord = async (req, res ) => {
  try {
      
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// edit record
const EditRecord = async (req, res ) => {
  try {
      
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// delete record
const DelRecord = async (req, res ) => {
  try {
      
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// get all records
const GetRecord = async (req, res ) => {
  try {
      
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//template
// const functionname = async (req, res ) => {
//   try {
      
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// }
module.exports = { AddPatient, EditPatient, FindPatient };

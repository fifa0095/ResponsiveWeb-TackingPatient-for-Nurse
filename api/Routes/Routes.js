const express = require('express')
const router = express.Router()

const formController = require('../Controllers/form')
const userController = require('../Controllers/user')

const multer = require('multer');

const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024 // no larger than 5MB
        },
        fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png/;
          const mimeType = fileTypes.test(file.mimetype);
          const extName = fileTypes.test(file.originalname.split('.').pop().toLowerCase());
          if (mimeType && extName) {
            return cb(null, true);
          }
          cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      });

router.post('/patients/create', formController.AddPatient);
router.get('/patients/get',formController.FindPatient);


router.post('/users/register', userController.create);
router.post('/users/login', userController.login);

module.exports = router
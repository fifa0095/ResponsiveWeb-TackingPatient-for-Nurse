/**
 * @swagger
 * tags:
 *   name: Examples
 *   description: API for examples
 */

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Returns an example response
 *     tags: [Examples]
 *     responses:
 *       200:
 *         description: Example response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Example endpoint'
 */

// ------- FORM SECTION -------------------------------------- //

// create new patient info

// edit patient info

// get patient info and can search
/**
 * @swagger
 * /api/v1/pateints/get:
 *   get:
 *     summary: Find patients based on Hospital Number (HN)
 *     description: Retrieves a list of patients based on the HN query parameter. If HN is not provided, the latest updated patients are returned.
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: query
 *         name: HN
 *         schema:
 *           type: string
 *           nullable: true
 *         required: false
 *         description: Hospital Number (HN) of the patient. If not provided, the endpoint returns the latest updated patients.
 *         example: ""
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The document ID of the patient in Firestore.
 *                     example: abc123
 *                   HN:
 *                     type: string
 *                     description: Hospital Number of the patient.
 *                     example: 12345
 *                   prefix:
 *                     type: string
 *                     description: Prefix of the patient's name.
 *                     example: Mr.
 *                   name:
 *                     type: string
 *                     description: First name of the patient.
 *                     example: John
 *                   surname:
 *                     type: string
 *                     description: Surname of the patient.
 *                     example: Doe
 *                   gender:
 *                     type: string
 *                     description: Gender of the patient.
 *                     example: Male
 *                   DOB:
 *                     type: string
 *                     format: date
 *                     description: Date of birth of the patient.
 *                     example: 1990-01-01
 *                   lastUpdate:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of the last update for the patient record.
 *                     example: 2024-08-08T12:34:56Z
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error message
 */



// ------- USERS SECTION -------------------------------------- //

// Register user
/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the database with the provided username, password, and user type.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: securepassword123
 *               user_type:
 *                 type: string
 *                 description: The type of user (e.g., admin, regular).
 *                 example: admin
 *             required:
 *               - username
 *               - password
 *               - user_type
 *     responses:
 *       200:
 *         description: Register user success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Register user success
 *       409:
 *         description: Has a duplicated username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Has a duplicated username
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error message
 */

// Log in  user
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: log in to get user infomation
 *     description: Creates a new user in the database with the provided username, password, and user type.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
*         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the organization account.
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Password of the organization account.
 *                 example: "securepassword123"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Register user success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Register user success
 *       401:
 *         description: Wrong username or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Wrong username or password
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error message
 */

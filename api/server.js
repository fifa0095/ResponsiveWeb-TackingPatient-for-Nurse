const express = require('express')
const swaggerSpecs = require('./swaggerConfig');
const swaggerUi = require('swagger-ui-express');
const router = require('./Routes/Routes');
const app = express()
const core = require('cors');
require('./Routes/Routes');

app.use(core());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/v1', router)


const PORT = process.env.PORT || 3000;
app.listen( PORT, () => { 
    console.log(`Server is running on PORT ${PORT}.`);
    console.log(`Swagger docs are available at http://localhost:${PORT}/docs`);
})
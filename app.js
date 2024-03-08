'use strict';

// External
const express = require('express'); 

// Internal
const router = require('./routes/index');
const port = process.env.PORT || 3000; 


const app = express(); 
app.use('/', router)
app.listen(port, () => console.log(`Listening on port ${port}`));
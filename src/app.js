const express = require('express');
const app = express();
require('./database')

// Middelware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Router
app.use('/', require('./routes/authRouter'))

// Server
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server running on port', port);
})
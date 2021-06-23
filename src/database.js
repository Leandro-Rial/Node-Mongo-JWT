const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const connected = mongoose.connection

connected.once('open', () => {
    console.log('Database Connected');
})
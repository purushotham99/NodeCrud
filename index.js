const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/CSDB';
var cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const con = mongoose.connection;

app.use(express.json());

const matchRouter = require('./Routers/matcher');
app.use('/match', matchRouter);

con.on('open', () => {
    console.log('connected....');
})

app.listen(9000, () => {
    console.log('Server Started')
})
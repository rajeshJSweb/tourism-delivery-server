const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a7yox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run() {
    
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Trip Server')
})

app.listen(port, () => {
    console.log('Running Trip Server on Port',port);
})
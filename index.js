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

async function run() {
    try {
        await client.connect();
        const database = client.db("book");
        const bookingCollection = database.collection("booking");
        const orderCollection = database.collection("orders");
        
       //Create a post API

       app.post('/booking', async (req, res) => {
        const services = req.body;
           const result = await bookingCollection.insertOne(services);
           res.json(result);
       })
        //Order Collection
       app.post('/orders', async (req, res) => {
           const services = req.body;
           const result = await orderCollection.insertOne(services);
           res.json(result);
       })
        
        //Get api
        app.get('/hotels', async (req, res) => {
            const result = await bookingCollection.find({}).toArray();
            res.send(result)
       })
        

        //Delete user 

        app.delete('/deleteHotels/:id', async (req, res) => {
            const deleteUser = (req.params.id);
            const result = await bookingCollection.deleteOne({_id:ObjectId(deleteUser)})
            res.send(result)
        })
      } finally {
        // await client.close();
      }
    
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Trip Server')
})

app.listen(port, () => {
    console.log('Running Trip Server on Port',port);
})
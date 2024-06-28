const express = require('express')
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json());


// console.log(, 'asdkssssss');


const uri = `mongodb+srv://${process.env.KEY_USER}:${process.env.KEY_PASS}@cluster0.gv1gxa1.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

async function run() {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection

        const database = client.db("Gallery");
        const collection = database.collection("art");
      app.get('/craft', async(req, res)=>{
         const source = collection.find();
         const result = await source.toArray();
         res.send(result)
      })

       app.post('/craft', async(req, res)=>{
         const craft = req.body;
         console.log(craft);
         const result = await collection.insertOne(craft)
         res.send(result)
       })


      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
   }
}
run().catch(console.dir);



app.get('/', (req ,res)=>{
   res.send('assignment server')
})

app.listen(port, ()=>{
   console.log(`assignment server is running || 5000`);
})
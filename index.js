const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(
   cors({
      origin:"http://localhost:5174",
      credentials: true,
   })
);
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
      const collection2 = database.collection("allArt");
      const addToCardCollection = database.collection("addCraft");
      app.get("/craft", async (req, res) => {
         const source = collection.find();
         const result = await source.toArray();
         res.send(result);
      });

      app.post("/craft", async (req, res) => {
         const craft = req.body;
         console.log(craft);
         const result = await collection2.insertOne(craft);
         res.send(result);
      });
      app.get("/craft/:id", async (req, res) => {
         const id = req.params.id;
         const query = { _id: new ObjectId(id) };
         const result = await collection.findOne(query);
         res.send(result);
      });

      //  add to card crud

      app.post("/myCraft", async (req, res) => {
         const addCraft = req.body;
         const result = await addToCardCollection.insertOne(addCraft);
         res.send(result);
      });

      app.get("/myCraft", async (req, res) => {
         const courser = addToCardCollection.find();
         const result = await courser.toArray();
         res.send(result);
      });

      app.delete("/myCraft/:id", async (req, res) => {
         const id = req.params.id;
         const query = { _id: id };
         console.log(query);
         const result = await addToCardCollection.deleteOne(query);
         res.send(result);
      });
      // all data crud
      app.get("/allArt", async (req, res) => {
         const courser = collection2.find();
         const result = await courser.toArray();
         res.send(result);
      });

      app.get("/allArt/:id", async (req, res) => {
         const id = req.params.id;
         const query = { _id: new ObjectId(id) };
         const result = await collection2.findOne(query);
         res.send(result);
      });

      app.put("/allArt/:id", async (req, res) => {
         const id = req.params.id;
         const filter = { _id: new ObjectId(id) };
         const options = { upsert: true };
         const updateArt = req.body;
         const Art = {
            $set: {
               url: updateArt.url,
               item_name: updateArt.item_name,
               subcategory_Name: updateArt.subcategory_Name,
               description: updateArt.description,
               rating: updateArt.rating,
               processing_time: updateArt.processing_time,
               customization: updateArt.customization,
               stockStatus: updateArt.stockStatus,
               price: updateArt.price,
            },
         };
         const result = await collection2.updateOne(filter, Art, options);
         res.send(result);
      });

      app.delete("/allArt/:id", async (req, res) => {
         const id = req.params.id;
         const query = { _id: new ObjectId(id) };
         const result = await collection2.deleteOne(query);
         res.send(result);
      });

      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
   }
}
run().catch(console.dir);

app.get("/", (req, res) => {
   res.send("assignment server");
});

app.listen(port, () => {
   console.log(`assignment server is running || 5000`);
});

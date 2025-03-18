//const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://nattalz:4aLRQ0gLK113PoPf@event00.ejm6r.mongodb.net/?retryWrites=true&w=majority&appName=Event00";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

export async function findUser(username, password) {
  try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const usersCollection = client.db("users_test").collection("users");
      const user = await usersCollection.findOne({ username, password });
      if (user) {
      console.log("User found:", JSON.stringify(user, null, 2));
      return true 
      } else {
      console.log("No matching user found.");
      return false
      }
  }catch (error){
      console.log("e")
  } 
  finally {
    // Ensures that the client will close when you finish/error
      await client.close();
  }
}

findUser("nattal","nattal").catch(console.dir)

export async function createUser(username, email, password) {
  try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const usersCollection = client.db("users_test").collection("users");
      const newUser = await usersCollection.insertOne({ username, email, password });
      console.log("new user added: ", newUser)
      return newUser
  }catch (error){
      console.log("e")
  } 
  finally {
    // Ensures that the client will close when you finish/error
      await client.close();
  }
}
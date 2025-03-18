import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || "mongodb+srv://nattalz:4aLRQ0gLK113PoPf@event00.ejm6r.mongodb.net/?retryWrites=true&w=majority&appName=Event00";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

app.post("/api/findUser", async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;
    const usersCollection = client.db("users_test").collection("users");
    const user = await usersCollection.findOne({ username, password });

    if (user) {
      return res.json({ success: true, message: "User found" });
    } else {
      return res.json({ success: false, message: "No matching user found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/createUser", async (req, res) => {
  try {
    await connectDB();
    const { username, email, password } = req.body;
    const usersCollection = client.db("users_test").collection("users");
    const newUser = await usersCollection.insertOne({ username, email, password });

    return res.json({ success: true, userId: newUser.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
